import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Drop } from "../../database/entities/Drop";
import { DropDto, PaginatedDropDto } from "./dto/drop.dto";
import { DropFilter } from "./request/drop-filter.request";
import { QueryBuilderHelper } from "../common/util/query-builder.helper";
import { CollectionService } from "../collection/collection.service";
import { NftService } from "../nft/nft.service";
import { NftStatus } from "../../database/entities/Nft";
import { BusinessException } from "../common/exception/business.exception";
import { ErrorCode } from "../common/exception/error-codes";
import { InjectQueue } from "@nestjs/bull";
import { Queue } from "bull";
import { CreateDropRequest } from "./request/create-drop.request";
import { BlockchainService } from "../blockchain/blockchain.service";
import { NftInDrop, NftInDropStatus } from "../../database/entities/NftInDrop";
import { BlockchainTransactionService } from "../blockchain/blockchain-transaction.service";
import { MetadataService } from "../metadata/metadata.service";
import { XummTransactionService } from "../xumm/xumm-transaction.service";

@Injectable()
export class DropService {
    constructor(
        private readonly blockchainService: BlockchainService,
        private readonly blockchainTransactionService: BlockchainTransactionService,
        private readonly collectionService: CollectionService,
        private readonly nftService: NftService,
        private readonly metadataService: MetadataService,
        private readonly xummTransactionService: XummTransactionService,
        @InjectRepository(Drop) private readonly dropRepository: Repository<Drop>,
        @InjectRepository(NftInDrop) private readonly nftInDropRepository: Repository<NftInDrop>,
        @InjectQueue("drop") private readonly dropQueue: Queue,
        @InjectQueue("transaction-status") private readonly transactionStatusQueue: Queue,
    ) {}

    async findAll(page = 1, pageSize = 25, filter?: DropFilter): Promise<PaginatedDropDto> {
        const take = pageSize;
        const skip = (page - 1) * take;
        const { qbWheres, relations } = DropFilter.toFilterClause(filter);

        const [entities, count] = await QueryBuilderHelper.buildFindManyAndCount(
            this.dropRepository,
            "drop",
            skip,
            take,
            ["collection", "collection.user", ...relations],
            qbWheres,
        );

        return {
            items: entities.map((drop) => DropDto.fromEntity(drop)),
            pages: Math.ceil(count / take),
            currentPage: page,
        };
    }

    async findById(id: number): Promise<DropDto> {
        const drop = await this.dropRepository.findOne(id, { relations: ["collection", "collection.user"] });
        return DropDto.fromEntity(drop);
    }

    async publish(ownerAddress: string, createDropRequest: CreateDropRequest): Promise<DropDto> {
        const collection = await this.collectionService.findOne(
            { id: createDropRequest.collectionId },
            {
                ownerAddress,
                relations: ["nfts", "user"],
            },
        );

        if (collection.nfts.some((nft) => nft.status !== NftStatus.DRAFT)) {
            throw new BusinessException(ErrorCode.COLLECTION_ALREADY_LAUNCHED);
        }

        const drop = await this.dropRepository.save({
            ...createDropRequest,
            collectionId: createDropRequest.collectionId,
            faqs: createDropRequest.faqs,
            items: collection.nfts.length,
            soldItems: 0,
        });

        for (const nft of collection.nfts) {
            await this.nftInDropRepository.save({
                dropId: drop.id,
                nftId: nft.id,
                price: createDropRequest.price,
            });
            await this.nftService.updateNftStatus(nft.id, NftStatus.PENDING);
            await this.dropQueue.add("nft-mint-queue", { nftId: nft.id }, { delay: 30000 });
        }

        const transaction = this.blockchainTransactionService.prepareAuthorizeMinterTransaction(ownerAddress);
        if (!(await this.blockchainService.isAccountAuthorized(ownerAddress))) {
            await this.xummTransactionService.sendTransactionRequest(
                ownerAddress,
                transaction,
                // TODO: HANDLE CASES WHERE DROP IS PUBLISHED BUT NEVER AUTHORIZED
                undefined,
                async () => {
                    await this.nftInDropRepository.update({ dropId: drop.id }, { status: NftInDropStatus.AUTHORIZED });
                },
            );
        }

        return this.findById(drop.id);
    }

    async mintNftInDrop(nftId: number): Promise<void> {
        const nft = await this.nftService.findOne(nftId, { relations: ["collection", "user"] });
        const uri = await this.metadataService.calculateUri(nftId);

        const transaction = await this.blockchainTransactionService.prepareNftMintTransaction({
            account: this.blockchainService.mintingAddress,
            flags: nft.flags,
            taxon: Number(nft.collection?.taxon || "0"),
            uri: uri,
            issuer: nft.user?.address,
            transferFee: nft.transferFee,
            memo: JSON.stringify({ id: nft.id }),
        });

        const signedTx = this.blockchainTransactionService.signTransactionWithMintingAccount(transaction);
        await this.blockchainTransactionService.broadcastTransaction(signedTx.tx_blob);

        await this.nftInDropRepository.update(
            { nftId: nft.id },
            {
                mintingTransactionHash: signedTx.hash,
                status: NftInDropStatus.MINTING,
            },
        );

        await this.transactionStatusQueue.add("track-status", { hash: signedTx.hash });
        await this.dropQueue.add("nft-sell-offer-queue", { nftId }, { delay: 30000 });
    }

    async sellNftInDrop(nftId: number): Promise<void> {
        const nftInDrop = await this.nftInDropRepository.findOne(nftId, { relations: ["nft"] });
        const transaction = await this.blockchainTransactionService.prepareSellOfferTransaction({
            account: this.blockchainService.mintingAddress,
            tokenId: nftInDrop.nft.tokenId,
            price: nftInDrop.price,
        });

        const signedTx = this.blockchainTransactionService.signTransactionWithMintingAccount(transaction);
        await this.blockchainTransactionService.broadcastTransaction(signedTx.tx_blob);

        await this.nftInDropRepository.update(
            { nftId },
            {
                offerTransactionHash: signedTx.hash,
                status: NftInDropStatus.CREATING_OFFER,
            },
        );

        await this.transactionStatusQueue.add("track-status", { hash: signedTx.hash });
        await this.dropQueue.add("nft-sold-queue", { nftId }, { delay: 60000 });
    }

    async checkNftSold(nftId: number): Promise<boolean> {
        const nftInDrop = await this.nftInDropRepository.findOne(nftId, { relations: ["nft", "drop"] });
        let offerId = nftInDrop.offerId;
        if (!offerId) {
            offerId = await this.blockchainTransactionService.getOfferIndexFromTransaction(nftInDrop.offerTransactionHash);
            if (!offerId) return false;
            await this.nftInDropRepository.update({ nftId }, { offerId });
        }

        const isFilled = await this.blockchainTransactionService.isNftOfferFilled(nftInDrop.nft.tokenId, offerId);
        if (isFilled) {
            await this.metadataService.publishMetadata(nftId);
            await this.nftInDropRepository.update({ nftId }, { status: NftInDropStatus.SOLD });
            await this.dropRepository.update({ id: nftInDrop.dropId }, { soldItems: nftInDrop.drop.items + 1 });
        }

        return isFilled;
    }
}

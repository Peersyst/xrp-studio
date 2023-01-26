import { Inject, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Drop } from "../../database/entities/Drop";
import { DropDto, PaginatedDropDto } from "./dto/drop.dto";

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
import { getRandomNumber } from "../common/util/random";
import { ValidatedLedgerTransaction } from "../blockchain/types";
import { dropsToXrp, NFTokenAcceptOffer, xrpToDrops } from "xrpl";
import { ConfigService } from "@nestjs/config";
import { RequestBuyNftDto } from "./dto/requestBuyNft.dto";
import { GetDropsRequest } from "./request/get-drops.request";

@Injectable()
export class DropService {
    private readonly sellCommissionPct: number;

    constructor(
        private readonly blockchainService: BlockchainService,
        private readonly blockchainTransactionService: BlockchainTransactionService,
        private readonly collectionService: CollectionService,
        private readonly nftService: NftService,
        private readonly metadataService: MetadataService,
        private readonly xummTransactionService: XummTransactionService,
        @Inject(ConfigService) private readonly configService: ConfigService,
        @InjectRepository(Drop) private readonly dropRepository: Repository<Drop>,
        @InjectRepository(NftInDrop) private readonly nftInDropRepository: Repository<NftInDrop>,
        @InjectQueue("drop") private readonly dropQueue: Queue,
        @InjectQueue("transaction-status") private readonly transactionStatusQueue: Queue,
    ) {
        this.sellCommissionPct = this.configService.get<number>("xrp.sellCommissionPct");
    }

    async findAll(filters: GetDropsRequest = { page: 1, pageSize: 15 }): Promise<PaginatedDropDto> {
        const { page, pageSize } = filters;
        const take = pageSize;
        const skip = (page - 1) * take;
        const { qbWheres, relations, qbOrders } = GetDropsRequest.toFilterClause(filters);

        const [entities, count] = await QueryBuilderHelper.buildFindManyAndCount(
            this.dropRepository,
            "drop",
            skip,
            take,
            ["collection", "collection.user", ...relations],
            qbWheres,
            qbOrders,
        );

        return {
            items: entities.map((drop) => DropDto.fromEntity(drop)),
            pages: Math.ceil(count / take),
            currentPage: page,
        };
    }

    async findById(id: number): Promise<DropDto> {
        const drop = await this.dropRepository.findOne(id, { relations: ["collection", "collection.user", "faqs"] });
        if (!drop) throw new BusinessException(ErrorCode.DROP_NOT_FOUND);
        return DropDto.fromEntity(drop);
    }

    async findByPath(path: string): Promise<DropDto> {
        const drop = await this.dropRepository.findOne({
            where: { collection: { path } },
            relations: ["collection", "collection.user", "faqs"],
        });
        if (!drop) throw new BusinessException(ErrorCode.DROP_NOT_FOUND);
        return DropDto.fromEntity(drop);
    }

    async requestAuthorization(address: string): Promise<void> {
        const transaction = this.blockchainTransactionService.prepareAuthorizeMinterTransaction(address);
        await this.xummTransactionService.sendTransactionRequest(address, transaction);
    }

    async requestBuyNft(buyerAddress, dropId: number): Promise<RequestBuyNftDto> {
        const nftsInDrop = await this.nftInDropRepository
            .createQueryBuilder("nftInDrop")
            .where("nftInDrop.dropId = :dropId AND nftInDrop.status != :status AND nftInDrop.offerId IS NOT NULL", {
                dropId,
                status: NftInDropStatus.SOLD,
            })
            .getMany();

        if (nftsInDrop.length === 0) throw new BusinessException(ErrorCode.DROP_SOLD_OUT);
        const nftInDrop = nftsInDrop[getRandomNumber(0, nftsInDrop.length)];

        const transaction = this.blockchainTransactionService.prepareAcceptOfferTransaction(buyerAddress, nftInDrop.offerId);
        const payload = await this.xummTransactionService.sendTransactionRequest(buyerAddress, transaction);
        return { nftId: nftInDrop.nftId, xummRequestUuid: payload.uuid };
    }

    async publish(ownerAddress: string, createDropRequest: CreateDropRequest): Promise<DropDto> {
        const collection = await this.collectionService.findOne(
            { id: createDropRequest.collectionId },
            {
                ownerAddress,
                relations: ["nfts", "user"],
            },
        );

        if (!collection.user?.verifiedArtist) {
            throw new BusinessException(ErrorCode.USER_IS_NOT_VERIFIED);
        }

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

        await new Promise((resolve) => setTimeout(resolve, 1000));

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
        await this.dropQueue.add("fetch-offer-id-queue", { nftId }, { delay: 30000 });
    }

    async fetchOfferId(nftId: number): Promise<string | undefined> {
        const nftInDrop = await this.nftInDropRepository.findOne(nftId, { relations: ["nft", "drop"] });
        if (nftInDrop.offerId) return nftInDrop.offerId;
        else {
            const offerId = await this.blockchainTransactionService.getOfferIndexFromTransaction(nftInDrop.offerTransactionHash);
            if (!offerId) return;
            await this.nftInDropRepository.update({ nftId }, { offerId, status: NftInDropStatus.OFFER_CREATED });
            return offerId;
        }
    }

    async processAcceptOfferTransaction(transaction: ValidatedLedgerTransaction<NFTokenAcceptOffer>): Promise<number | undefined> {
        if (!transaction.NFTokenSellOffer)
            throw new Error("Panic! Unknown transaction processed as nft accept offer " + JSON.stringify(transaction));

        const nftInDrop = await this.nftInDropRepository.findOne({ offerId: transaction.NFTokenSellOffer }, { relations: ["drop"] });
        if (!nftInDrop) return;

        await this.nftInDropRepository.update(
            { nftId: nftInDrop.nftId },
            {
                status: NftInDropStatus.SOLD,
                acceptOfferTransactionHash: transaction.hash,
            },
        );
        await this.dropRepository.update({ id: nftInDrop.dropId }, { soldItems: nftInDrop.drop.soldItems + 1 });
        await this.dropQueue.add("nft-funding-queue", { nftId: nftInDrop.nftId }, { delay: 10000 });
        return nftInDrop.nftId;
    }

    async fundForNftSold(nftId: number): Promise<boolean> {
        const nftInDrop = await this.nftInDropRepository.findOne(nftId, { relations: ["nft", "drop"] });

        // Cross validation
        const offerId = await this.blockchainTransactionService.getOfferIndexFromTransaction(nftInDrop.offerTransactionHash);
        if (!offerId || !nftInDrop.offerId || offerId !== nftInDrop.offerId) {
            throw new Error(`Panic! Offer Id not found or offers are not equal ${JSON.stringify({ offerId, nftInDrop })}`);
        }

        const isFilled = await this.blockchainTransactionService.isNftOfferFilled(nftInDrop.nft.tokenId, offerId);
        if (!isFilled) {
            throw new Error(
                `Panic! Offer id appears not to be filled but we are trying to fund the artist ${JSON.stringify({ nftInDrop, offerId })}`,
            );
        }
        const refund = Number(dropsToXrp(nftInDrop.price)) - Number(dropsToXrp(nftInDrop.price)) * this.sellCommissionPct;
        const transaction = await this.blockchainTransactionService.preparePaymentTransaction({
            account: this.blockchainService.mintingAddress,
            destination: nftInDrop.nft.account,
            amount: xrpToDrops(refund),
            memo: `NFToken ${nftInDrop.nft.tokenId} sold`,
        });
        await this.metadataService.publishMetadata(nftInDrop.nftId);
        const signedTx = this.blockchainTransactionService.signTransactionWithMintingAccount(transaction);
        await this.blockchainTransactionService.broadcastTransaction(signedTx.tx_blob);
        await this.nftInDropRepository.update({ nftId }, { status: NftInDropStatus.FUNDING, fundingTransactionHash: signedTx.hash });
        await this.transactionStatusQueue.add("track-status", { hash: signedTx.hash });

        return isFilled;
    }
}

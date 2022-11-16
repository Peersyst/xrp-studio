import { forwardRef, Inject, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Nft, NftStatus } from "../../database/entities/Nft";
import { ValidatedLedgerTransaction } from "../blockchain/types";
import { NFTokenMint } from "xrpl/dist/npm/models/transactions/NFTokenMint";
import { Repository, SelectQueryBuilder } from "typeorm";
import { convertStringToHex, decodeAccountID } from "xrpl";
import { User } from "../../database/entities/User";
import { Collection } from "../../database/entities/Collection";
import { CollectionService } from "../collection/collection.service";
import { InjectQueue } from "@nestjs/bull";
import { Queue } from "bull";
import { MetadataDto } from "./dto/metadata.dto";
import { NftMetadata } from "../../database/entities/NftMetadata";
import { NftMetadataAttribute } from "../../database/entities/NftMetadataAttribute";
import unscrambleTaxon from "./util/unscrambleTaxon";
import { CreateNftDraftRequest } from "./request/create-nft-draft.request";
import flagsToNumber from "./util/flagsToNumber";
import { NftDraftDto, PaginatedNftDraftDto } from "./dto/nft-draft.dto";
import { UpdateNftDraftRequest } from "./request/update-nft-draft-request";
import { Paginated } from "../common/paginated.dto";
import { Order, Where, WhereConditions, WhereParameters } from "../common/types";
import { NftDto, PaginatedNftDto } from "./dto/nft.dto";
import { GetNftsRequest } from "./request/get-nfts.request";
import { GetNftDraftsRequest, NftDraftStatus } from "./request/get-nft-drafts.request";
import { BaseGetNftsRequest } from "./request/base-get-nfts.request";
import { BusinessException } from "../common/exception/business.exception";
import { ErrorCode } from "../common/exception/error-codes";
import { XummService } from "@peersyst/xumm-module";
import { CreateNftQueryBuilderOptions, NftWithCollection } from "./types";
import { IpfsService } from "@peersyst/ipfs-module/src/ipfs.service";
import { IMessageEvent } from "websocket";
import { NftDraftStatusDto } from "./dto/nft-draft-status.dto";
import { BlockchainTransactionService } from "../blockchain/blockchain-transaction.service";

@Injectable()
export class NftService {
    constructor(
        @InjectRepository(NftMetadata) private readonly nftMetadataRepository: Repository<NftMetadata>,
        @InjectRepository(NftMetadataAttribute) private readonly nftMetadataAttributeRepository: Repository<NftMetadataAttribute>,
        @InjectQueue("metadata") private readonly metadataQueue: Queue,
        @Inject(IpfsService) private readonly ipfsService: IpfsService,
    ) {}

    async sendToProcessMetadata(nft: Nft): Promise<void> {
        await this.metadataQueue.add("process-metadata", { nft: nft }, { timeout: 25000, removeOnFail: true });
    }

    /**
     * Creates NftMetadata and assigns it to an Nft
     */
    async createMetadata(nftId: number, metadataDto: MetadataDto, forceRegenerate = true): Promise<NftMetadata> {
        const metadata = await this.nftMetadataRepository.findOne({ nftId });
        // If nft has metadata it means it was a draft with metadata. We have to delete it as it has to be overridden by its final metadata
        if (metadata && forceRegenerate) await this.nftMetadataRepository.delete({ nftId });
        // Create attributes with nftMetadataId = nft.id, as it will be the value for nftMetadata.id
        return this.nftMetadataRepository.create({
            ...metadataDto,
            nftId,
        });
    }

    async publishMetadata(metadata: NftMetadata): Promise<string> {
        const metadataDto = MetadataDto.fromEntity(metadata);
        return this.ipfsService.uploadFile(Buffer.from(metadataDto.encode()));
    }

    async calculateCid(metadata: MetadataDto): Promise<string> {
        return this.ipfsService.calculateCid(Buffer.from(metadata.encode()));
    }
}

import { forwardRef, Inject, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Nft, NftStatus } from "../../database/entities/Nft";
import { ValidatedLedgerTransaction } from "../blockchain/types";
import { NFTokenMint } from "xrpl/dist/npm/models/transactions/NFTokenMint";
import { Repository, SelectQueryBuilder } from "typeorm";
import { convertStringToHex, decodeAccountID } from "xrpl";
import { CollectionService } from "../collection/collection.service";
import { NftMetadataAttribute } from "../../database/entities/NftMetadataAttribute";
import unscrambleTaxon from "./util/unscrambleTaxon";
import { CreateNftDraftRequest } from "./request/create-nft-draft.request";
import flagsToNumber from "./util/flagsToNumber";
import { NftDraftDto, PaginatedNftDraftDto } from "./dto/nft-draft.dto";
import { UpdateNftDraftRequest } from "./request/update-nft-draft-request";
import { NftDto, PaginatedNftDto } from "./dto/nft.dto";
import { GetNftsRequest } from "./request/get-nfts.request";
import { BusinessException } from "../common/exception/business.exception";
import { ErrorCode } from "../common/exception/error-codes";
import { XummService } from "@peersyst/xumm-module";
import { CreateNftQueryBuilderOptions, NftWithCollection } from "./types";
import { IMessageEvent } from "websocket";
import { NftDraftStatusDto } from "./dto/nft-draft-status.dto";
import { MetadataService } from "../metadata/metadata.service";
import { QueryBuilderHelper } from "../common/util/query-builder.helper";
import { CollectionDto } from "../collection/dto/collection.dto";
import { UserService } from "../user/user.service";

@Injectable()
export class NftService {
    constructor(
        private readonly metadataService: MetadataService,
        private readonly userService: UserService,
        @InjectRepository(Nft) private readonly nftRepository: Repository<Nft>,
        @Inject(forwardRef(() => CollectionService)) private readonly collectionService: CollectionService,
        @Inject(XummService) private readonly xummService: XummService,
    ) {}

    /**
     * Creates an Nft entity from a given NFTokenMint transaction
     */
    async createNftFromMintTransaction({
        Account,
        Flags,
        TransferFee,
        Issuer,
        NFTokenTaxon,
        URI,
        hash,
        Memos,
    }: ValidatedLedgerTransaction<NFTokenMint>): Promise<Nft> {
        const issuerOrCreator = Issuer || Account;
        // Get last nft tokenId from the Issuer
        const lastNft = await this.nftRepository
            .createQueryBuilder("nft")
            .select("SUBSTRING(nft.token_id, 57, 64) as token_id")
            .where("nft.issuer = :issuer AND nft.status = :confirmed", { issuer: issuerOrCreator, confirmed: NftStatus.CONFIRMED })
            .orderBy("SUBSTRING(nft.token_id, 57, 64)::bytea", "DESC")
            .getRawOne<{ token_id: string }>();
        // Build new nft's tokenId
        const lastTokenSequence = lastNft ? Number("0x" + lastNft.token_id) : -1;
        const tokenSequence = lastTokenSequence + 1;
        const tokenSequenceHex = tokenSequence.toString(16).toUpperCase().padStart(8, "0");
        const flags = Flags?.toString(16).padStart(8, "0").substring(4).toUpperCase() || "0000";
        const transferFee = TransferFee?.toString(16).toUpperCase().padStart(4, "0") || "0000";
        const issuer = decodeAccountID(issuerOrCreator).toString("hex").toUpperCase();
        const scrambledTaxon = unscrambleTaxon(NFTokenTaxon, tokenSequence);
        const scrambledTaxonHex = scrambledTaxon.toString(16).toUpperCase().padStart(8, "0");
        const tokenId = flags + transferFee + issuer + scrambledTaxonHex + tokenSequenceHex;

        // Create collection if NFTokenTaxon > 0. Cannot use cascade as we are inserting a collection without primary key
        let collection: CollectionDto;
        if (NFTokenTaxon) {
            try {
                collection = await this.collectionService.findOne({ taxon: NFTokenTaxon.toString(), account: Account });
            } catch (e) {
                collection = await this.collectionService.createCollection(Account, {}, false);
            }
        }

        // Get draft id from memo if mint comes from a draft
        let possibleDraftId: number;
        if (Memos) {
            // Find a memo with an object including draftId
            for (const { Memo } of Memos) {
                try {
                    const parsedMemo = JSON.parse(Buffer.from(Memo.MemoData, "hex").toString());
                    if (parsedMemo.id) {
                        possibleDraftId = Number(parsedMemo.id);
                        break;
                    }
                } catch (e) {}
            }
        }
        let draftNft: Nft | undefined;
        if (possibleDraftId && !isNaN(possibleDraftId)) {
            // Get draft nft ensuring the draft id belongs to the user. Thus, publish is legit for that draft
            draftNft = await this.createQueryBuilder({ relations: { user: true } })
                .where("nft.id = :id AND nft.status != :confirmed AND user.address = :address", {
                    id: possibleDraftId,
                    confirmed: NftStatus.CONFIRMED,
                    address: Account,
                })
                .getOne();
        }

        await this.userService.createIfNotExists(Account);

        try {
            if (collection) await this.collectionService.addItems(collection.id, 1);
            const savedNft = await this.nftRepository.save({
                id: draftNft ? draftNft.id : undefined,
                tokenId: tokenId,
                mintTransactionHash: hash,
                issuer: issuerOrCreator,
                transferFee: TransferFee,
                flags: Number("0x" + flags),
                // May not be necessary in mainnet release but has to be checked in devnet in order to store the nft even if the uri is invali,
                uri: URI && URI.length <= 256 ? URI : undefined,
                status: NftStatus.CONFIRMED,
                account: Account,
                collectionId: collection?.id,
            });
            if (savedNft.uri) await this.metadataService.sendToProcessMetadata(savedNft);
            return savedNft;
        } catch (e) {
            if (collection) await this.collectionService.addItems(collection.id, -1);
            throw { error: e, tokenId };
        }
    }

    /**
     * Create an Nft with draft status
     */
    async createNftDraft(
        address: string,
        {
            taxon,
            issuer,
            transferFee,
            flags: { burnable = false, onlyXRP = false, trustLine = false, transferable = false } = {},
            metadata,
        }: CreateNftDraftRequest,
        publish = false,
    ): Promise<NftDraftDto> {
        // Build User, Collection and Nft entities
        let collection: CollectionDto | undefined;
        try {
            collection = taxon
                ? await this.collectionService.findOne({
                      taxon: taxon.toString(),
                      account: address,
                  })
                : undefined;
        } catch {}

        // Create nft without metadata as we need an id to reference first
        const nftEntity = await this.nftRepository.save({
            issuer: issuer || address,
            transferFee: transferFee ? transferFee : undefined,
            flags: flagsToNumber({ tfBurnable: burnable, tfOnlyXRP: onlyXRP, tfTrustLine: trustLine, tfTransferable: transferable }),
            status: NftStatus.DRAFT,
            account: address,
            collectionId: collection?.id,
        });

        // If there's metadata, create entities and attach it to the nft
        if (metadata) {
            await this.metadataService.create(nftEntity.id, metadata);
        }

        if (publish) await this.publishDraft(nftEntity.id, address);

        return this.findOne(nftEntity.id, { relations: ["user", "collection", "metadata", "metadata.attributes"] });
    }

    /**
     * Updates an NFT draft
     */
    async updateNftDraft(
        id: number,
        address: string,
        { issuer, transferFee, flags, taxon, metadata }: UpdateNftDraftRequest,
        publish = false,
    ): Promise<void> {
        // Check draft exists and belongs to the address given
        await this.findOne(id, { ownerAddress: address, status: NftStatus.DRAFT });

        // Find taxon & address collection or use undefined and remove relation if any
        let collection: CollectionDto | undefined;
        try {
            collection = taxon
                ? await this.collectionService.findOne({
                      taxon: taxon.toString(),
                      account: address,
                  })
                : undefined;
        } catch {}

        // Delete metadata if new NftDraft does not include it
        if (Object.entries(metadata || {}).length === 0) await this.metadataService.delete(id);
        await this.metadataService.create(id, metadata, true);

        // Update entity
        const { burnable = false, onlyXRP = false, trustLine = false, transferable = false } = flags || {};
        await this.nftRepository.update(
            { id },
            {
                issuer: issuer || address,
                transferFee: transferFee ? transferFee * 1000 : null,
                flags: flags
                    ? flagsToNumber({ tfBurnable: burnable, tfOnlyXRP: onlyXRP, tfTrustLine: trustLine, tfTransferable: transferable })
                    : undefined,
                collectionId: collection?.id || null,
            },
        );

        if (publish) await this.publishDraft(id, address);
    }

    /**
     * Publishes an nft draft
     * Creates and NFTokenMintTransaction, subscribes to it and updates the draft status accordingly
     * Pre:
     * * nftDraft.status != "published"
     * * The following relations must be provided:
     *   * Collection
     *   * Metadata
     *   * Metadata attributes
     */
    public async publishDraft(nftId: number, account: string, publishMetadata = true): Promise<void> {
        const nftDraft = await this.findOne(nftId, { ownerAddress: account });
        if (nftDraft.status === NftStatus.PENDING) throw new BusinessException(ErrorCode.NFT_DRAFT_ALREADY_PUBLISHED);

        const { id: draftId, collection, issuer, transferFee, flags, metadata } = nftDraft;

        // Build metadata
        let cid: string;
        if (Object.entries(metadata || {}).length > 0 && publishMetadata) {
            cid = await this.metadataService.publishMetadata(draftId);
        }

        const memo = { id: draftId, ...(metadata?.name && { name: metadata.name }) };

        // Build NFTokenMintTransaction
        const nftokenMintTransaction: NFTokenMint = {
            TransactionType: "NFTokenMint",
            Account: account,
            NFTokenTaxon: Number(collection?.taxon || "0"),
            Flags: flags,
            Memos: [
                {
                    Memo: {
                        MemoData: Buffer.from(JSON.stringify(memo), "utf8").toString("hex"),
                    },
                },
            ],
        };

        if (issuer && issuer !== account) nftokenMintTransaction.Issuer = issuer;
        if (transferFee) nftokenMintTransaction.TransferFee = transferFee;
        if (cid) nftokenMintTransaction.URI = convertStringToHex("ipfs://" + cid);

        // Create transaction and subscribe
        const subscription = await this.xummService.transactionRequestAndSubscribe(account, { ...nftokenMintTransaction });
        // Update draft status to "pending"
        await this.nftRepository.update({ id: draftId }, { status: NftStatus.PENDING });

        // Listen to XUMM transaction events
        // * If rejected or expired set draft status to "failed"
        subscription.websocket.onmessage = async (message: IMessageEvent) => {
            if (typeof message.data === "string") {
                try {
                    const jsonData = JSON.parse(message.data);
                    if (jsonData.signed === false || jsonData.expired === true) {
                        await this.nftRepository.update({ id: draftId }, { status: NftStatus.FAILED });
                        subscription.websocket.close();
                    } else if (jsonData.signed === true) subscription.websocket.close();
                } catch (e) {}
            }
        };
    }

    async findOne<Status extends NftStatus>(
        id: number,
        options?: { ownerAddress?: string; status?: Status; relations?: string[] },
    ): Promise<Status extends NftStatus.CONFIRMED ? NftDto : NftDraftDto> {
        const { ownerAddress, status, relations = ["metadata", "metadata.attributes"] } = options || {};
        if (ownerAddress && relations.indexOf("user") === -1) relations.push("user");
        const nft = await this.nftRepository.findOne(id, { relations });
        if (!nft) throw new BusinessException(ErrorCode.NFT_NOT_FOUND);
        if (ownerAddress && nft?.user?.address !== ownerAddress) throw new BusinessException(ErrorCode.NFT_NOT_FOUND);
        if (status && nft.status !== status) throw new BusinessException(ErrorCode.NFT_NOT_FOUND);

        return (
            nft.status === NftStatus.CONFIRMED ? NftDto.fromEntity(nft) : NftDraftDto.fromEntity(nft)
        ) as Status extends NftStatus.CONFIRMED ? NftDto : NftDraftDto;
    }

    /**
     * Returns the status of an NFT draft
     */
    async getNftDraftsStatus(ids: number[], account: string): Promise<NftDraftStatusDto[]> {
        const drafts = await this.createQueryBuilder({ relations: { user: true } })
            .where("nft.id IN (:...ids) AND nft.status != :confirmed AND user.address = :account", {
                ids,
                confirmed: NftStatus.CONFIRMED,
                account,
            })
            .getMany();
        // Forcing type is safe as draft will never have status = "confirmed"
        return drafts.map((draft) => NftDraftStatusDto.fromEntity(draft));
    }

    /**
     * Find all NFTs
     */
    async findAll(
        nftsRequest: GetNftsRequest = new GetNftsRequest(),
        extraFilters: { status?: NftStatus | NftStatus[]; ownerAddress?: string } = {},
    ): Promise<PaginatedNftDto | PaginatedNftDraftDto> {
        const { page = 1, pageSize = 15 } = nftsRequest;
        const take = pageSize;
        const skip = (page - 1) * take;
        const { qbWheres, relations } = GetNftsRequest.toFilterClause(nftsRequest, extraFilters);

        const [entities, count] = await QueryBuilderHelper.buildFindManyAndCount(
            this.nftRepository,
            "nft",
            skip,
            take,
            [...relations],
            qbWheres,
        );

        return {
            items: entities.map((nft) => (nft.status === NftStatus.CONFIRMED ? NftDto.fromEntity(nft) : NftDraftDto.fromEntity(nft))),
            pages: Math.ceil(count / take),
            currentPage: page,
        };
    }

    /**
     * Creates query builder with required joins
     */
    private createQueryBuilder<WithCollection extends boolean = true>({
        // @ts-ignore
        relations = { user: true, collection: true, metadata: true, attribute: true },
    }: CreateNftQueryBuilderOptions<WithCollection> = {}): SelectQueryBuilder<WithCollection extends true ? NftWithCollection : Nft> {
        const qb = this.nftRepository.createQueryBuilder("nft");
        if (relations.user) qb.innerJoinAndSelect("nft.user", "user");
        if (relations.collection) {
            qb.leftJoinAndSelect("nft.collection", "collection");
            qb.loadRelationCountAndMap("collection.items", "collection.nfts");
        }
        if (relations.metadata) qb.leftJoinAndSelect("nft.metadata", "metadata");
        if (relations.attribute)
            qb.leftJoinAndMapMany("metadata.attributes", NftMetadataAttribute, "attribute", "attribute.nft_metadata_id = nft.id");
        return qb as SelectQueryBuilder<WithCollection extends true ? NftWithCollection : Nft>;
    }
}

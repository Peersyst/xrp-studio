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
import { IMessageEvent } from "websocket";
import { NftDraftStatusDto } from "./dto/nft-draft-status.dto";
import { MetadataService } from "../metadata/metadata.service";
import { NftMetadata } from "../../database/entities/NftMetadata";

@Injectable()
export class NftService {
    constructor(
        private readonly metadataService: MetadataService,
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

        // Create Account user, this will create the entity if it does not exist, otherwise it will reference to the existing user
        const user = new User();
        user.address = Account;

        // Create collection if NFTokenTaxon > 0. Cannot use cascade as we are inserting a collection without primary key
        let collection: Collection;
        if (NFTokenTaxon) {
            collection = await this.collectionService.findCollectionByTaxonAndAccount(NFTokenTaxon.toString(), Account);
            if (!collection) {
                collection = new Collection();
                collection.taxon = NFTokenTaxon.toString();
                collection.user = user;
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

        // Create the new Nft entity
        const nft = new Nft();
        // If a draft exists assign its id in order to update it
        if (draftNft) nft.id = draftNft.id;
        nft.tokenId = tokenId;
        nft.mintTransactionHash = hash;
        nft.issuer = issuerOrCreator;
        nft.transferFee = TransferFee;
        nft.flags = Number("0x" + flags);
        // May not be necessary in mainnet release but has to be checked in devnet in order to store the nft even if the uri is invalid
        nft.uri = URI && URI.length <= 256 ? URI : undefined;
        nft.status = NftStatus.CONFIRMED;
        nft.user = user;
        nft.collection = collection;

        try {
            const savedNft = await this.nftRepository.save(nft);
            if (savedNft.uri) await this.metadataService.sendToProcessMetadata(savedNft);
            return savedNft;
        } catch (e) {
            throw { error: e, nft };
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
        const user = new User({ address });

        const collection = taxon
            ? await this.collectionService.findCollectionByTaxonAndAccount(taxon.toString(), user.address, {
                  notFoundError: true,
              })
            : undefined;

        const nft = new Nft({
            issuer: issuer || address,
            transferFee: transferFee ? transferFee * 1000 : undefined,
            flags: flagsToNumber({ tfBurnable: burnable, tfOnlyXRP: onlyXRP, tfTrustLine: trustLine, tfTransferable: transferable }),
            status: NftStatus.DRAFT,
            user,
            collection,
        });

        // Create nft without metadata as we need an id to reference first
        const nftEntity = await this.nftRepository.save(nft);

        // If there's metadata, create entities and attach it to the nft
        let metadataEntity: NftMetadata | undefined = undefined;
        if (metadata) {
            metadataEntity = await this.metadataService.create(nftEntity.id, metadata);
        }
        if (publish) await this.publishDraft(nftEntity.id, address);

        // We have to include collection with items again, as save will return a regular Nft with a collection without items
        return NftDraftDto.fromEntity({ ...nftEntity, collection, metadata: metadataEntity });
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
        await this.findOneDraft(id, address);

        // Find taxon & address collection or use undefined and remove relation if any
        const collection = taxon
            ? await this.collectionService.findCollectionByTaxonAndAccount(taxon.toString(), address, {
                  notFoundError: true,
              })
            : undefined;

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
                collection: collection || null,
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
        const nftDraft = await this.findOneDraftEntity(nftId, account);
        if (nftDraft.status === NftStatus.PENDING) throw new BusinessException(ErrorCode.NFT_DRAFT_ALREADY_PUBLISHED);

        const { id: draftId, collection, issuer, transferFee, flags, metadata } = nftDraft;

        // Build metadata
        let cid: string;
        if (metadata && publishMetadata) {
            cid = await this.metadataService.publishMetadata(metadata.nftId);
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

    /**
     * Find one NFT (status = confirmed)
     */
    async findOne(id: number): Promise<NftDto> {
        const nft = await this.nftQuery("nft.id = :id AND nft.status = :confirmed", { id, confirmed: NftStatus.CONFIRMED });
        return NftDto.fromEntity(nft);
    }

    /**
     * Find one NFT draft (status != confirmed)
     */
    async findOneDraft(id: number, reqAddress: string): Promise<NftDraftDto> {
        const draftNft = await this.findOneDraftEntity(id, reqAddress);
        return NftDraftDto.fromEntity(draftNft);
    }

    /**
     * Returns the status of an NFT draft
     */
    async getNftDraftStatus(id: number, account: string): Promise<NftDraftStatus> {
        const draft = await this.findOneDraft(id, account);
        // Forcing type is safe as draft will never have status = "confirmed"
        return draft.status as unknown as NftDraftStatus;
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
     * Find all NFTs (status = confirmed)
     */
    async findAll({ account, ...baseFilters }: GetNftsRequest = {}): Promise<PaginatedNftDto> {
        const wheres: Where<Nft>[] = [];
        wheres.push(["nft.status = :confirmed", { confirmed: NftStatus.CONFIRMED }]);
        if (account) wheres.push(["user.address = :account", { account }]);
        const { items, pages, currentPage } = await this.nftsQuery(baseFilters, ...wheres);
        return {
            items: items.map((nft) => NftDto.fromEntity(nft)),
            pages,
            currentPage,
        };
    }

    /**
     * Find all NFT drafts (status != confirmed)
     */
    async findAllDrafts(address: string, { status, ...baseFilters }: GetNftDraftsRequest = {}): Promise<PaginatedNftDraftDto> {
        const wheres: Where<Nft>[] = [];
        wheres.push(["user.address = :address", { address }]);
        wheres.push(["nft.status != :confirmed", { confirmed: NftStatus.CONFIRMED }]);
        if (status) wheres.push(["nft.status = :status", { status }]);
        const { items, pages, currentPage } = await this.nftsQuery(baseFilters, ...wheres);
        return {
            items: items.map((nft) => NftDraftDto.fromEntity(nft)),
            pages,
            currentPage,
        };
    }

    /**
     * Gets nft
     */
    private async nftQuery(where: WhereConditions<Nft>, params?: WhereParameters): Promise<NftWithCollection | undefined> {
        const qb = this.createQueryBuilder();
        qb.where(where, params);
        const nft = await qb.getOne();
        if (!nft) throw new BusinessException(ErrorCode.NFT_NOT_FOUND);
        return nft;
    }

    /**
     * Gets all nfts
     */
    private async nftsQuery(
        { page = 1, pageSize = 15, query, collections, order = Order.DESC }: BaseGetNftsRequest = {},
        ...wheres: Where<Nft>[]
    ): Promise<Paginated<NftWithCollection>> {
        const take = pageSize;
        const skip = (page - 1) * take;

        const qb = this.createQueryBuilder();

        qb.take(take);
        qb.skip(skip);

        if (query)
            qb.andWhere("LOWER(collection.name) like :query OR LOWER(metadata.name) like :query", { query: `%${query.toLowerCase()}%` });
        if (collections) qb.andWhere("collection.id IN (:...collections)", { collections });
        if (wheres.length) wheres.forEach(([where, params]) => qb.andWhere(where, params));

        qb.orderBy("nft.id", order);

        const [nfts, count] = await qb.getManyAndCount();

        return {
            items: nfts,
            pages: Math.ceil(count / take),
            currentPage: page,
        };
    }

    /**
     * Find one NFT draft entity (status != confirmed)
     */
    private async findOneDraftEntity(id: number, reqAddress: string): Promise<NftWithCollection> {
        try {
            const nft = await this.nftQuery("nft.id = :id AND nft.status != :confirmed", {
                id,
                confirmed: NftStatus.CONFIRMED,
            });
            if (nft.user.address !== reqAddress) throw new BusinessException(ErrorCode.NFT_DRAFT_NOT_OWNED);
            return nft;
        } catch (e) {
            if (e.response?.message === ErrorCode.NFT_NOT_FOUND) throw new BusinessException(ErrorCode.NFT_DRAFT_NOT_FOUND);
            else throw e;
        }
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

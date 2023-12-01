import { forwardRef, Inject, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Nft, NftStatus } from "../../database/entities/Nft";
import { ValidatedLedgerTransaction } from "../blockchain/types";
import { NFTokenMint } from "xrpl/dist/npm/models/transactions/NFTokenMint";
import { FindConditions, ObjectLiteral, Repository, SelectQueryBuilder } from "typeorm";
import { CollectionService } from "../collection/collection.service";
import { NftMetadataAttribute } from "../../database/entities/NftMetadataAttribute";
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
import { NftDraftStatusDto } from "./dto/nft-draft-status.dto";
import { MetadataService } from "../metadata/metadata.service";
import { QueryBuilderHelper } from "../common/util/query-builder.helper";
import { CollectionDto } from "../collection/dto/collection.dto";
import { UserService } from "../user/user.service";
import { BlockchainTransactionService } from "../blockchain/blockchain-transaction.service";
import { XummTransactionService } from "../xumm/xumm-transaction.service";
import { BlockchainService } from "../blockchain/blockchain.service";
import { getTokenIdFromTransaction } from "./util/parseTokenId";
import { NftPreviewDto } from "./dto/nft-preview.dto";
import { PHYGITAL_NFT_TRAIT_TYPE } from "./nft.constants";
import { GoogleSpreadsheet, GoogleSpreadsheetRow } from "google-spreadsheet";
import { JWT } from "google-auth-library";
import { ConfigService } from "@nestjs/config";
import { AuctionDto } from "./dto/auction.dto";

@Injectable()
export class NftService {
    constructor(
        private readonly metadataService: MetadataService,
        private readonly userService: UserService,
        @InjectRepository(Nft) private readonly nftRepository: Repository<Nft>,
        @Inject(forwardRef(() => CollectionService)) private readonly collectionService: CollectionService,
        @Inject(XummService) private readonly xummService: XummService,
        private readonly xummTransactionService: XummTransactionService,
        @Inject(forwardRef(() => BlockchainService)) private readonly blockchainService: BlockchainService,
        @Inject(forwardRef(() => BlockchainTransactionService)) private readonly blockchainTransactionService: BlockchainTransactionService,
        @Inject(ConfigService) private readonly configService: ConfigService,
    ) {}

    /**
     * Creates an Nft entity from a given NFTokenMint transaction
     */
    async createNftFromMintTransaction(tx: ValidatedLedgerTransaction<NFTokenMint>): Promise<Nft> {
        const { Account, Flags, TransferFee, Issuer, NFTokenTaxon, URI, hash, Memos } = tx;
        const issuerOrCreator = Issuer || Account;

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
                    address: issuerOrCreator,
                })
                .getOne();
        }

        if (!draftNft) {
            throw new Error(`Could not find draft nft with id ${possibleDraftId} for user ${issuerOrCreator}`);
        }

        await this.userService.createIfNotExists(issuerOrCreator);

        // Get last nft tokenId from the Issuer
        const tokenId = getTokenIdFromTransaction(tx);
        const flags = Flags?.toString(16).padStart(8, "0").substring(4).toUpperCase() || "0000";

        // Create collection if NFTokenTaxon > 0. Cannot use cascade as we are inserting a collection without primary key
        let collection: CollectionDto;
        if (NFTokenTaxon) {
            try {
                collection = await this.collectionService.findOne({ taxon: NFTokenTaxon.toString(), account: issuerOrCreator });
            } catch (e) {
                collection = await this.collectionService.createCollection(issuerOrCreator, { taxon: NFTokenTaxon }, false);
            }
        }

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
                account: issuerOrCreator,
                ownerAccount: issuerOrCreator,
                collectionId: collection?.id,
            });
            // we don't need to process metadata again since it was a draft
            // if (savedNft.uri && Account !== this.blockchainService.mintingAddress)
            // await this.metadataService.sendToProcessMetadata(savedNft.id, convertHexToString(savedNft.uri));
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
            ownerAccount: address,
            collectionId: collection?.id,
        });

        // If there's metadata, create entities and attach it to the nft
        if (metadata) {
            await this.metadataService.create(nftEntity.id, metadata);
        }

        if (publish) await this.publishDraft(nftEntity.id, address);

        return this.findOne({ id: nftEntity.id }, { relations: ["user", "collection", "metadata", "metadata.attributes"] });
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
        const nft = await this.findOne({ id }, { ownerAddress: address, status: [NftStatus.DRAFT, NftStatus.FAILED] });

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
        if (Object.entries(metadata || nft.metadata || {}).length === 0) await this.metadataService.delete(id);
        await this.metadataService.create(id, metadata || nft.metadata, true);

        // Update entity
        const { burnable = false, onlyXRP = false, trustLine = false, transferable = false } = flags || {};
        await this.nftRepository.update(
            { id },
            {
                ...(issuer !== undefined || address !== undefined ? { issuer: issuer || address } : {}),
                ...(transferFee !== undefined ? { transferFee } : {}),
                ...(flags !== undefined
                    ? {
                          flags: flagsToNumber({
                              tfBurnable: burnable,
                              tfOnlyXRP: onlyXRP,
                              tfTrustLine: trustLine,
                              tfTransferable: transferable,
                          }),
                      }
                    : {}),
                collectionId: collection?.id,
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
    public async publishDraft(nftId: number, ownerAddress?: string): Promise<void> {
        const nftDraft = await this.findOne(
            { id: nftId },
            {
                status: [NftStatus.DRAFT, NftStatus.FAILED],
                ownerAddress,
                relations: ["metadata", "metadata.attributes", "user", "collection"],
            },
        );

        // Update draft status to "pending"
        await this.updateNftStatus(nftId, NftStatus.PENDING);

        const { id: draftId, collection, transferFee, flags, metadata } = nftDraft;

        const cid = metadata && (await this.metadataService.publishMetadata(nftId));

        const transaction = await this.blockchainTransactionService.prepareNftMintTransaction(
            {
                account: ownerAddress,
                flags: flags,
                taxon: Number(collection?.taxon || "0"),
                uri: cid && "ipfs://" + cid,
                transferFee: transferFee,
                memo: JSON.stringify({ id: draftId, ...(metadata?.name && { name: metadata.name }) }),
            },
            false,
        );

        await this.xummTransactionService.sendTransactionRequest(ownerAddress, transaction, async () => {
            await this.nftRepository.update({ id: nftId }, { status: NftStatus.FAILED });
        });
    }

    /**
     * Deletes an NFT draft
     */
    public async deleteNftDraft(id: number, account: string): Promise<void> {
        const nft = await this.findOne({ id }, { ownerAddress: account, status: [NftStatus.DRAFT, NftStatus.FAILED] });
        await this.metadataService.delete(nft.id);
        await this.nftRepository.delete({ id: nft.id });
    }

    async findOne<Status extends NftStatus[]>(
        where: FindConditions<Nft> | string | [string, ObjectLiteral],
        options?: { ownerAddress?: string; status?: Status; relations?: string[] },
    ): Promise<Status extends [NftStatus.CONFIRMED] ? NftDto : NftDraftDto> {
        const { ownerAddress, status, relations = ["metadata", "metadata.attributes"] } = options || {};
        if (ownerAddress && relations.indexOf("user") === -1) relations.push("user");

        let nft: Nft | undefined;

        // Query can be executed with query builder or with find one
        if (Array.isArray(where) || typeof where === "string") {
            let qb = this.nftRepository.createQueryBuilder("nft");

            for (const relation of relations) {
                const relationParts = relation.split(".");
                const [entity, alias] = relationParts.length === 1 ? ["nft", relation] : relationParts;
                qb = qb.leftJoinAndSelect(`${entity}.${alias}`, alias);
            }

            const [query, params] = Array.isArray(where) ? where : [where];
            qb = qb.where(query, params);

            nft = await qb.getOne();
        } else {
            // It should also work with the query builder implementation
            nft = await this.nftRepository.findOne(where, { relations });
        }

        if (!nft) throw new BusinessException(ErrorCode.NFT_NOT_FOUND);
        if (ownerAddress && nft?.user?.address !== ownerAddress) throw new BusinessException(ErrorCode.NFT_NOT_FOUND);
        if (status && status.indexOf(nft.status) < 0) {
            throw new BusinessException(ErrorCode.NFT_NOT_FOUND);
        }

        return (nft.status === NftStatus.CONFIRMED ? NftDto.fromEntity(nft) : NftDraftDto.fromEntity(nft)) as Status extends [
            NftStatus.CONFIRMED,
        ]
            ? NftDto
            : NftDraftDto;
    }

    async findPhygitalNftByPublicKey(publicKey: string): Promise<NftDto> {
        return await this.findOne<[NftStatus.CONFIRMED]>(
            [
                "EXISTS (SELECT * from nft_metadata_attribute as nma where nma.nft_metadata_id = nft.id AND nma.trait_type = :phygitalTraitType AND nma.value = :publicKey)",
                { phygitalTraitType: PHYGITAL_NFT_TRAIT_TYPE, publicKey },
            ],
            {
                status: [NftStatus.CONFIRMED],
                relations: ["metadata", "metadata.attributes", "user", "collection", "nftInDrop", "offers"],
            },
        );
    }

    async count(where: FindConditions<Nft>): Promise<number> {
        return this.nftRepository.count({ where });
    }

    public async updateNftStatus(nftId: number, newStatus: NftStatus): Promise<void> {
        const nft = await this.nftRepository.findOne(nftId);
        if (!nft) throw new BusinessException(ErrorCode.NFT_NOT_FOUND);
        if (
            (nft.status === NftStatus.DRAFT && newStatus !== NftStatus.PENDING) ||
            (nft.status === NftStatus.PENDING && newStatus !== NftStatus.FAILED && newStatus !== NftStatus.CONFIRMED) ||
            (nft.status === NftStatus.FAILED && newStatus !== NftStatus.PENDING) ||
            nft.status === NftStatus.CONFIRMED
        )
            throw new Error(`Invalid update status from ${nft.status} to ${newStatus}`);
        await this.nftRepository.update({ id: nftId }, { status: newStatus });
    }

    public async updateOwnerAccount(id: number, ownerAccount: string): Promise<void> {
        await this.userService.createIfNotExists(ownerAccount);
        await this.nftRepository.update({ id }, { ownerAccount });
    }

    /**
     * Returns the status of an NFT draft
     */
    async getNftDraftsStatus(ids: number[], account: string): Promise<NftDraftStatusDto[]> {
        const drafts = await this.createQueryBuilder({ relations: { user: true } })
            .where("nft.id IN (:...ids) AND user.address = :account", {
                ids,
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
        requesterAccount?: string,
    ): Promise<PaginatedNftDto | PaginatedNftDraftDto> {
        const { page = 1, pageSize = 15 } = nftsRequest;
        const take = pageSize;
        const skip = (page - 1) * take;
        const { qbWheres, relations, qbOrders } = GetNftsRequest.toFilterClause(nftsRequest, { requesterAccount });

        const [entities, count] = await QueryBuilderHelper.buildFindManyAndCount(
            this.nftRepository,
            "nft",
            skip,
            take,
            [...relations],
            qbWheres,
            qbOrders,
        );

        return {
            items: entities.map((nft) => (nft.status === NftStatus.CONFIRMED ? NftDto.fromEntity(nft) : NftDraftDto.fromEntity(nft))),
            pages: Math.ceil(count / take),
            currentPage: page,
        };
    }

    async findRandomNftsInDrop(dropId: number): Promise<NftPreviewDto[]> {
        const nfts = await this.nftRepository
            .createQueryBuilder("nft")
            .leftJoinAndSelect("nft.nftInDrop", "nftInDrop")
            .leftJoinAndSelect("nft.metadata", "metadata")
            .leftJoinAndSelect("metadata.attributes", "attributes")
            .where("nftInDrop.dropId = :dropId", { dropId })
            .orderBy("RANDOM()")
            .limit(10)
            .getMany();

        return nfts.map((nft) => NftPreviewDto.fromEntity(nft));
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

    public async auctionNft(sheetId: string, endDate: number): Promise<AuctionDto> {
        const doc = this.getSheetAuction(sheetId);
        await doc.loadInfo();
        const sheet = doc.sheetsByIndex[0];
        const rows = await sheet.getRows();
        return this.getAuctionByNftId(rows, endDate);
    }

    private getSheetAuction(sheetId: string): GoogleSpreadsheet {
        const serviceAccountAuth = new JWT({
            email: this.configService.get("auction.googleClientEmail"),
            key: this.configService.get("auction.googlePrivateApiKey").replace(/\\n/g, "\n"),
            scopes: ["https://www.googleapis.com/auth/spreadsheets"],
        });
        const doc = new GoogleSpreadsheet(sheetId, serviceAccountAuth);
        return doc;
    }

    public getAuctionByNftId(rows: GoogleSpreadsheetRow<Record<string, any>>[], originEndDate: number): AuctionDto {
        // auction es 0 por default
        const extensionPeriod = this.configService.get("auction.extensionSeconds") * 1000;
        let price = 0;
        let currentEndDate = originEndDate;
        for (const row of rows) {
            const element = row.toObject();
            const rowDate = this.parseStylesheetDate(element["Marca temporal"]);
            const rowAmount = Number(element["Place your bid in EUR"]);
            if (rowDate.getTime() <= currentEndDate && rowAmount && rowAmount > price) {
                price = rowAmount;
                if (rowDate.getTime() + extensionPeriod >= originEndDate && rowDate.getTime() <= currentEndDate) {
                    currentEndDate = rowDate.getTime() + extensionPeriod;
                }
            }
        }
        return { price, endTimestamp: currentEndDate };
    }

    parseStylesheetDate(date: string): Date {
        const timezone = this.configService.get("auction.googleTimezoneUTC");
        const [dayDate, hourDate] = date.split(" ");
        const [day, month, year] = dayDate.split("/");
        const [hour, minute, second] = hourDate.split(":");
        return new Date(`${year}-${month}-${day} ${hour}:${minute}:${second} ${timezone}`);
    }
}

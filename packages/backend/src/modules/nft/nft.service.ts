import { Inject, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Nft, NftStatus } from "../../database/entities/Nft";
import { ValidatedLedgerTransaction } from "../blockchain/types";
import { NFTokenMint } from "xrpl/dist/npm/models/transactions/NFTokenMint";
import { Repository, SelectQueryBuilder } from "typeorm";
import { decodeAccountID } from "xrpl";
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
import { GetNftDraftsRequest } from "./request/get-nft-drafts.request";
import { BaseGetNftsRequest } from "./request/base-get-nfts.request";
import { BusinessException } from "../common/exception/business.exception";
import { ErrorCode } from "../common/exception/error-codes";

@Injectable()
export class NftService {
    constructor(
        @InjectRepository(Nft) private readonly nftRepository: Repository<Nft>,
        @InjectRepository(NftMetadata) private readonly nftMetadataRepository: Repository<NftMetadata>,
        @InjectRepository(NftMetadataAttribute) private readonly nftMetadataAttributeRepository: Repository<NftMetadataAttribute>,
        @InjectQueue("metadata") private readonly metadataQueue: Queue,
        @Inject(CollectionService) private readonly collectionService: CollectionService,
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
    }: ValidatedLedgerTransaction<NFTokenMint>): Promise<Nft> {
        const issuerOrCreator = Issuer || Account;
        // Get last nft tokenId from the Issuer
        const lastNft = await this.nftRepository
            .createQueryBuilder("nft")
            .select("SUBSTRING(nft.token_id, 57, 64) as token_id")
            .where("nft.issuer = :issuer", { issuer: issuerOrCreator })
            .orderBy("SUBSTRING(nft.token_id, 57, 64)::bytea", "DESC")
            .getRawOne<{ token_id: string }>();
        // Build new nft's tokenId
        const lastTokenSequence = Number("0x" + (lastNft?.token_id || "0"));
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

        // Create the new Nft entity
        const nft = new Nft();
        nft.tokenId = tokenId;
        nft.mintTransactionHash = hash;
        nft.issuer = issuerOrCreator;
        nft.transferFee = TransferFee;
        nft.flags = Number("0x" + flags);
        // May not be necessary in mainnet release but has to be checked in devnet in order to store the nft even if the uri is invalid
        nft.uri = URI && URI.length < 256 ? URI : undefined;
        nft.status = NftStatus.CONFIRMED;
        nft.user = user;
        nft.collection = collection;

        try {
            const savedNft = await this.nftRepository.save(nft);
            if (savedNft.uri) await this.metadataQueue.add("process-metadata", { nft: savedNft }, { timeout: 25000, removeOnFail: true });
            return savedNft;
        } catch (e) {
            throw { error: e, nft };
        }
    }

    /**
     * Creates NftMetadata and assigns it to an Nft
     */
    async createNftMetadata(nft: Nft, { name, description, image, backgroundColor, externalUrl, attributes }: MetadataDto): Promise<Nft> {
        // Create attributes with nftMetadataId = nft.id, as it will be the value for nftMetadata.id
        const metadataAttributes = attributes?.map((attribute) => new NftMetadataAttribute({ nftMetadataId: nft.id, ...attribute }));
        // Create metadata related to the nft
        nft.metadata = new NftMetadata({ name, description, image, backgroundColor, externalUrl, attributes: metadataAttributes, nft });
        // Let typeorm cascades do the work
        return this.nftRepository.save(nft);
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
        let nftEntity = await this.nftRepository.save(nft);

        // If there's metadata, create entities and attach it to the nft
        if (metadata) {
            const { attributes, ...restMetadata } = metadata;
            const nftMetadata = new NftMetadata({ nft: nftEntity, ...restMetadata });
            nftMetadata.attributes = attributes?.map(
                (attribute) => new NftMetadataAttribute({ nftMetadataId: nftEntity.id, ...attribute }),
            );
            nftEntity = await this.nftRepository.save({ ...nftEntity, metadata: nftMetadata });
        }

        return NftDraftDto.fromEntity(nftEntity);
    }

    /**
     * Updates an NFT draft
     */
    async updateNftDraft(
        id: number,
        address: string,
        { issuer, transferFee, flags, taxon, metadata }: UpdateNftDraftRequest,
    ): Promise<void> {
        // Find taxon & address collection or use undefined and remove relation if any
        const collection = taxon
            ? await this.collectionService.findCollectionByTaxonAndAccount(taxon.toString(), address, {
                  notFoundError: true,
              })
            : undefined;

        let nftMetadata;
        // Delete metadata if new NftDraft does not include it
        if (!metadata) await this.nftMetadataRepository.delete({ nft: new Nft({ id }) });
        else {
            const { name, description, image, backgroundColor, externalUrl, attributes } = metadata;
            // Delete old attributes as we need to override them
            await this.nftMetadataAttributeRepository.delete({ nftMetadataId: id });
            // Create new attributes and metadata
            const nftMetadataAttributes = attributes?.map((attribute) => new NftMetadataAttribute({ nftMetadataId: id, ...attribute }));
            nftMetadata = new NftMetadata({
                name: name || null,
                description: description || null,
                image: image || null,
                backgroundColor: backgroundColor || null,
                externalUrl: externalUrl || null,
                attributes: nftMetadataAttributes,
                nft: new Nft({ id }),
            });
        }

        // Update entity
        const { burnable = false, onlyXRP = false, trustLine = false, transferable = false } = flags || {};
        await this.nftRepository.save({
            id,
            issuer: issuer || address,
            transferFee: transferFee ? transferFee * 1000 : null,
            flags: flags
                ? flagsToNumber({ tfBurnable: burnable, tfOnlyXRP: onlyXRP, tfTrustLine: trustLine, tfTransferable: transferable })
                : undefined,
            collection: collection || null,
            metadata: nftMetadata,
        });
    }

    /**
     * Find one NFT (status = confirmed)
     */
    async findOne(id: number): Promise<NftDto> {
        const nft = await this.nftQuery("id = :id AND status = :confirmed", { id, confirmed: NftStatus.CONFIRMED });
        return NftDto.fromEntity(nft);
    }

    /**
     * Find one NFT draft (status != confirmed)
     */
    async findOneDraft(id: number, reqAddress: string): Promise<NftDraftDto> {
        try {
            const nft = await this.nftQuery("id = :id AND status != :confirmed", {
                id,
                confirmed: NftStatus.CONFIRMED,
            });
            if (nft.user.address !== reqAddress) throw new BusinessException(ErrorCode.NFT_DRAFT_NOT_OWNED);
            return NftDraftDto.fromEntity(nft);
        } catch (e) {
            if (e.response?.message === ErrorCode.NFT_NOT_FOUND) throw new BusinessException(ErrorCode.NFT_DRAFT_NOT_FOUND);
            else throw e;
        }
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
    private async nftQuery(where: WhereConditions<Nft>, params?: WhereParameters): Promise<Nft | undefined> {
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
        { page = 1, pageSize = 15, query, collection, order = Order.DESC }: BaseGetNftsRequest = {},
        ...wheres: Where<Nft>[]
    ): Promise<Paginated<Nft>> {
        const take = pageSize;
        const skip = (page - 1) * take;

        const qb = this.createQueryBuilder();

        qb.take(take);
        qb.skip(skip);

        if (query)
            qb.andWhere("LOWER(collection.name) like :query OR LOWER(metadata.name) like :query", { query: `${query.toLowerCase()}` });
        if (collection) qb.andWhere("collection.id = :collection", { collection });
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
     * Creates query builder with required joins
     */
    private createQueryBuilder(): SelectQueryBuilder<Nft> {
        return this.nftRepository
            .createQueryBuilder("nft")
            .innerJoinAndSelect("nft.user", "user")
            .leftJoinAndSelect("nft.collection", "collection")
            .leftJoinAndSelect("nft.metadata", "metadata")
            .leftJoinAndSelect("NftMetadataAttribute", "attribute", "attribute.nft_metadata_id = nft.id");
    }
}

import { forwardRef, Inject, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Collection } from "../../database/entities/Collection";
import { Repository, SelectQueryBuilder } from "typeorm";
import { CollectionWithItems, CreateCollectionQueryBuilderOptions, FindCollectionByTaxonAndAccountOptions } from "./types";
import { BusinessException } from "../common/exception/business.exception";
import { ErrorCode } from "../common/exception/error-codes";
import { CollectionDto, PaginatedCollectionDto } from "./dto/collection.dto";
import { NftStatus } from "../../database/entities/Nft";
import { GetCollectionsRequest } from "./request/get-collections.request";
import { Paginated } from "../common/paginated.dto";
import { GetNftsRequest } from "../nft/request/get-nfts.request";
import { Order } from "../common/types";
import { CreateCollectionRequest } from "./request/create-collection.request";
import { User } from "../../database/entities/User";
import { UpdateCollectionRequest } from "./request/update-collection.request";
import { NftService } from "../nft/nft.service";

@Injectable()
export class CollectionService {
    constructor(
        @InjectRepository(Collection) private readonly collectionRepository: Repository<Collection>,
        @Inject(forwardRef(() => NftService)) private readonly nftService: NftService,
    ) {}

    /**
     * Creates a collection
     */
    async createCollection(
        address: string,
        { taxon: reqTaxon, nfts, ...restOfCollection }: CreateCollectionRequest,
        publish?: boolean,
    ): Promise<CollectionDto> {
        // Get the taxon
        let taxon: string;
        if (reqTaxon) {
            // If a taxon is given, check the account does not already have a collection with that taxon
            const collection = await this.findCollectionByTaxonAndAccount(reqTaxon.toString(), address);
            if (collection) throw new BusinessException(ErrorCode.COLLECTION_TAXON_ALREADY_EXISTS);
            taxon = reqTaxon.toString();
        } else {
            // Otherwise find a taxon not used by the account
            taxon = await this.findUnusedTaxon(address);
        }

        // Build User attached to the collection
        const user = new User({ address });

        // Build and save Collection
        const collection = await this.collectionRepository.save(new Collection({ taxon, ...restOfCollection, user }));

        //Create nfts
        if (nfts)
            for await (const nft of nfts)
                await this.nftService.createNftDraft(address, { ...nft, taxon: Number(collection.taxon) }, publish);

        return CollectionDto.fromEntity(collection);
    }

    /**
     * Updates a collection
     */
    async updateCollection(id: number, address: string, { name, description, image, header }: UpdateCollectionRequest): Promise<void> {
        const collection = await this.findOwnedCollection(id, address);
        await this.collectionRepository.save({
            ...collection,
            name: name,
            description: description || null,
            image: image || null,
            header: header || null,
        });
    }

    /**
     * Finds a collection by a taxon and account
     */
    async findCollectionByTaxonAndAccount(
        taxon: string,
        account: string,
        { notFoundError = false }: FindCollectionByTaxonAndAccountOptions = {},
    ): Promise<CollectionWithItems | undefined> {
        const collection = await this.createQueryBuilder()
            .where("taxon = :taxon AND account = :address", { taxon, address: account })
            .getOne();
        if (notFoundError && !collection) throw new BusinessException(ErrorCode.COLLECTION_NOT_FOUND);
        return collection;
    }

    /**
     * Finds one collection by its id
     */
    async findOne(id: number, options?: CreateCollectionQueryBuilderOptions & { ownerAddress: string }): Promise<CollectionDto> {
        const collection = await this.createQueryBuilder(options).where("collection.id = :id", { id }).getOne();
        if (!collection) throw new BusinessException(ErrorCode.COLLECTION_NOT_FOUND);
        if (options.ownerAddress && collection.user.address !== options.ownerAddress)
            throw new BusinessException(ErrorCode.COLLECTION_NOT_OWNED);
        return CollectionDto.fromEntity(collection);
    }

    /**
     * Finds all collections
     */
    async findAll(filters?: GetNftsRequest): Promise<PaginatedCollectionDto> {
        const { items, pages, currentPage } = await this.collectionsQuery(filters);
        return {
            items: items.map((collection) => CollectionDto.fromEntity(collection)),
            pages,
            currentPage,
        };
    }

    /**
     * Finds an owned collection or throws an error
     */
    async findOwnedCollection(id: number, address: string): Promise<Collection> {
        const collection = await this.createQueryBuilder({ relations: { user: true, nft: true } })
            .where("collection.id = :id", { id })
            .getOne();
        if (!collection) throw new BusinessException(ErrorCode.COLLECTION_NOT_FOUND);
        else if (collection.user.address !== address) throw new BusinessException(ErrorCode.COLLECTION_NOT_OWNED);
        return collection;
    }

    /**
     * Gets all collections
     */
    private async collectionsQuery({ page = 1, pageSize = 15, query, account, order = Order.DESC }: GetCollectionsRequest = {}): Promise<
        Paginated<CollectionWithItems>
    > {
        const take = pageSize;
        const skip = (page - 1) * take;

        const qb = this.createQueryBuilder();

        qb.take(take);
        qb.skip(skip);

        if (query) qb.andWhere("LOWER(collection.name) like :query", { query: `%${query.toLowerCase()}%` });
        // Can be refactored as NftService.nftsQuery when collection states are implemented in order to give extra wheres (account would be one of them)
        if (account) qb.andWhere("user.address = :account", { account });

        qb.orderBy("collection.id", order);

        const [collections, count] = await qb.getManyAndCount();

        return {
            items: collections,
            pages: Math.ceil(count / take),
            currentPage: page,
        };
    }

    /**
     * Creates query builder with required joins
     */
    private createQueryBuilder<WithItems extends boolean = true>({
        // @ts-ignore
        withItems = true,
        relations = { user: true, nft: false },
    }: CreateCollectionQueryBuilderOptions<WithItems> = {}): SelectQueryBuilder<WithItems extends true ? CollectionWithItems : Collection> {
        const qb = this.collectionRepository.createQueryBuilder("collection");
        if (withItems) {
            qb.loadRelationCountAndMap("collection.items", "collection.nfts", "nft", (qb) =>
                qb.where("nft.status = :confirmed", { confirmed: NftStatus.CONFIRMED }),
            );
        }
        if (relations.user) qb.innerJoinAndSelect("collection.user", "user");
        if (relations.nft) {
            qb.innerJoinAndSelect("collection.nfts", "nfts");
        }
        return qb as SelectQueryBuilder<WithItems extends true ? CollectionWithItems : Collection>;
    }

    /**
     * Finds an unused taxon by an account
     */
    private async findUnusedTaxon(address: string): Promise<string> {
        // As it is really unlikely that a user has more than 10k collections, we can query missing taxons by steps of 10000 or even less if necessary
        for (let i = 10000; i < 4294967295; i += 10000) {
            const missingTaxonArr =
                ((await this.collectionRepository.query(
                    "SELECT s.i AS missing_taxon FROM generate_series(1,$1) s(i) WHERE NOT EXISTS (SELECT 1 FROM collection WHERE account = $2 AND taxon = s.i) LIMIT 1;",
                    [i, address],
                )) as [{ missing_taxon: string }]) || [];
            if (missingTaxonArr.length) return missingTaxonArr[0].missing_taxon;
        }
        throw new BusinessException(ErrorCode.NO_MORE_TAXONS_AVAILABLE);
    }
}

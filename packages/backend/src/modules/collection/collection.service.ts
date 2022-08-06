import { Injectable } from "@nestjs/common";
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

@Injectable()
export class CollectionService {
    constructor(@InjectRepository(Collection) private readonly collectionRepository: Repository<Collection>) {}

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
    async findOne(id: number): Promise<CollectionDto> {
        const collection = await this.createQueryBuilder().where("id = :id", { id }).getOne();
        if (!collection) throw new BusinessException(ErrorCode.COLLECTION_NOT_FOUND);
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

        if (query) qb.andWhere("LOWER(collection.name) like :query", { query: `${query.toLowerCase()}` });
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
        relations = { user: true, nft: true },
    }: CreateCollectionQueryBuilderOptions<WithItems> = {}): SelectQueryBuilder<WithItems extends true ? CollectionWithItems : Collection> {
        const qb = this.collectionRepository.createQueryBuilder("collection");
        if (relations.user) qb.innerJoinAndSelect("collection.user", "user");
        if (relations.nft)
            qb.loadRelationCountAndMap("collection.items", "collection.nfts", "nft", (qb) =>
                qb.where("nft.status = :confirmed", { confirmed: NftStatus.CONFIRMED }),
            );
        return qb as SelectQueryBuilder<WithItems extends true ? CollectionWithItems : Collection>;
    }
}

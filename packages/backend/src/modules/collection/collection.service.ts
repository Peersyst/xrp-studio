import { forwardRef, Inject, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Collection } from "../../database/entities/Collection";
import { Repository } from "typeorm";
import { BusinessException } from "../common/exception/business.exception";
import { ErrorCode } from "../common/exception/error-codes";
import { CollectionDto, PaginatedCollectionDto } from "./dto/collection.dto";
import { GetCollectionsRequest } from "./request/get-collections.request";
import { CreateCollectionRequest } from "./request/create-collection.request";
import { User } from "../../database/entities/User";
import { UpdateCollectionRequest } from "./request/update-collection.request";
import { NftService } from "../nft/nft.service";
import { QueryBuilderHelper } from "../common/util/query-builder.helper";

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
            const collection = await this.findOne({ taxon: reqTaxon.toString(), account: address });
            if (collection) throw new BusinessException(ErrorCode.COLLECTION_TAXON_ALREADY_EXISTS);
            taxon = reqTaxon.toString();
        } else {
            // Otherwise find a taxon not used by the account
            taxon = await this.findUnusedTaxon(address);
        }

        // Build User attached to the collection
        const user = new User({ address });

        // Build and save Collection
        const collection = await this.collectionRepository.save(new Collection({ taxon, ...restOfCollection, user, items: 0 }));

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
        const collection = await this.findOne({ id }, { relations: ["user"] });

        if (collection?.user?.address !== address) throw new BusinessException(ErrorCode.COLLECTION_NOT_OWNED);

        await this.collectionRepository.update(id, {
            name: name,
            description: description || null,
            image: image || null,
            header: header || null,
        });
    }

    async addItems(id: number, inc: number): Promise<void> {
        const collection = await this.findOne({ id });
        await this.collectionRepository.update(
            { id },
            {
                items: (collection.items || 0) + inc,
            },
        );
    }

    async findOne(
        key: { id: number } | { taxon: string; account: string },
        { relations, ownerAddress }: { ownerAddress?: string; relations?: string[] } = { relations: ["user"] },
    ): Promise<CollectionDto> {
        if ("taxon" in key && relations.indexOf("user") < 0) relations.push("user");
        else if (ownerAddress && relations.indexOf("user") < 0) relations.push("user");

        const where = "id" in key ? { id: key.id } : { taxon: key.taxon, user: { address: key.account } };

        const collection = await this.collectionRepository.findOne({ where, relations });
        if (!collection || (ownerAddress && collection.account !== ownerAddress))
            throw new BusinessException(ErrorCode.COLLECTION_NOT_FOUND);

        return CollectionDto.fromEntity(collection);
    }

    /**
     * Finds all collections
     */
    async findAll(filters: GetCollectionsRequest = { page: 1, pageSize: 15 }): Promise<PaginatedCollectionDto> {
        const { page, pageSize } = filters;
        const take = pageSize;
        const skip = (page - 1) * take;
        const { qbWheres, relations, qbOrders } = GetCollectionsRequest.toFilterClause(filters);

        const [entities, count] = await QueryBuilderHelper.buildFindManyAndCount(
            this.collectionRepository,
            "collection",
            skip,
            take,
            [...relations, "user"],
            qbWheres,
            qbOrders,
        );

        return {
            items: entities.map((collection) => CollectionDto.fromEntity(collection)),
            pages: Math.ceil(count / take),
            currentPage: page,
        };
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

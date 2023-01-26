import { forwardRef, Inject, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Collection } from "../../database/entities/Collection";
import { Repository } from "typeorm";
import { BusinessException } from "../common/exception/business.exception";
import { ErrorCode } from "../common/exception/error-codes";
import { CollectionDto, PaginatedCollectionDto } from "./dto/collection.dto";
import { GetCollectionsRequest } from "./request/get-collections.request";
import { CreateCollectionRequest } from "./request/create-collection.request";
import { UpdateCollectionRequest } from "./request/update-collection.request";
import { NftService } from "../nft/nft.service";
import { QueryBuilderHelper } from "../common/util/query-builder.helper";
import { NftStatus } from "../../database/entities/Nft";
import { getRandomNumber } from "../common/util/random";
import { UserService } from "../user/user.service";

@Injectable()
export class CollectionService {
    constructor(
        @InjectRepository(Collection) private readonly collectionRepository: Repository<Collection>,
        @Inject(forwardRef(() => NftService)) private readonly nftService: NftService,
        private readonly userService: UserService,
    ) {}

    /**
     * Creates a collection
     */
    async createCollection(
        address: string,
        { taxon: reqTaxon, nfts, name, ...restOfCollection }: CreateCollectionRequest,
        publish?: boolean,
    ): Promise<CollectionDto> {
        // Get the taxon
        let taxon: string;
        if (reqTaxon) {
            // If a taxon is given, check the account does not already have a collection with that taxon
            let collection: CollectionDto | undefined;
            try {
                collection = await this.findOne({ taxon: reqTaxon.toString(), account: address });
            } catch (e) {}
            if (collection) throw new BusinessException(ErrorCode.COLLECTION_TAXON_ALREADY_EXISTS);
            taxon = reqTaxon.toString();
        } else {
            // Otherwise find a taxon not used by the account
            taxon = await this.findUnusedTaxon(address);
        }

        // Build User attached to the collection
        const user = await this.userService.findOne(address);

        // Build and save Collection
        const collection = await this.collectionRepository.save({
            taxon,
            name,
            ...restOfCollection,
            account: user.address,
            items: 0,
            path: await this.generateCollectionPath(name, user.name),
        });

        //Create nfts
        if (nfts)
            for await (const nft of nfts)
                await this.nftService.createNftDraft(address, { ...nft, taxon: Number(collection.taxon) }, publish);
        return this.findOne({ id: collection.id }, { relations: ["user", "nfts"] });
    }

    /**
     * Updates a collection
     */
    async updateCollection(
        id: number,
        address: string,
        { name, description, image, header, nfts }: UpdateCollectionRequest,
        publish?: boolean,
    ): Promise<CollectionDto> {
        const collection = await this.findOne({ id }, { relations: ["user"] });

        if (collection?.user?.address !== address) throw new BusinessException(ErrorCode.COLLECTION_NOT_OWNED);

        await this.collectionRepository.update(id, {
            name: name,
            description: description || null,
            image: image || null,
            header: header || null,
            ...(collection.name !== name ? { path: await this.generateCollectionPath(name, collection.user.name) } : {}),
        });

        if (nfts) for await (const nft of nfts) await this.nftService.createNftDraft(address, { ...nft, taxon: Number(collection.taxon) });

        if (publish) {
            const collection = await this.findOne({ id }, { relations: ["nfts"] });
            for (const nft of collection.nfts) {
                if (nft.status !== NftStatus.CONFIRMED && nft.status !== NftStatus.PENDING) {
                    await this.nftService.publishDraft(nft.id, address);
                }
            }
        }
        return this.findOne({ id: collection.id }, { relations: ["user", "nfts"] });
    }

    async addItems(id: number, inc: number): Promise<void> {
        await this.collectionRepository.update(
            { id },
            {
                items: () => `items ${inc >= 0 ? "+" : "-"} ${Math.abs(inc)}`,
            },
        );
    }

    async findOne(
        key: { id: number } | { taxon: string; account: string } | { path: string },
        { relations, ownerAddress }: { ownerAddress?: string; relations?: string[] } = { relations: ["user"] },
    ): Promise<CollectionDto> {
        if (("taxon" in key || "path" in key || ownerAddress) && relations.indexOf("user") < 0) relations.push("user");

        let where;
        if ("id" in key) where = { id: key.id };
        else if ("taxon" in key) where = { taxon: key.taxon, user: { address: key.account } };
        else where = { path: key.path };

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
     * Checks if a collection name is available for a user
     */
    async collectionNameIsAvailable(name: string, account): Promise<boolean> {
        const collection = await this.collectionRepository.findOne({ name, account });
        return !collection;
    }

    /**
     * Generates collection path from a collection name and a user name
     */
    private async generateCollectionPath(collectionName: string, userName: string): Promise<string> {
        const path = `${collectionName.replace(" ", "_")}_by_${userName.replace(" ", "_")}`;
        const collection = await this.collectionRepository.findOne({ path });
        if (!collection) return path;
        else return `${path}_${collection.id}`;
    }

    /**
     * Finds an unused taxon by an account
     */
    private async findUnusedTaxon(address: string): Promise<string> {
        let taxonNumber: number;
        do {
            taxonNumber = getRandomNumber(1, 4294967295);
        } while (await this.collectionRepository.findOne({ taxon: taxonNumber.toString(), account: address }));
        return taxonNumber.toString();
    }
}

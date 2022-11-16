import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Drop } from "../../database/entities/Drop";
import { DropDto, PaginatedDropDto } from "./dto/drop.dto";
import { DropFilter } from "./request/drop-filter.request";
import { QueryBuilderHelper } from "../common/util/query-builder.helper";
import { CollectionService } from "../collection/collection.service";
import { NftService } from "../nft/nft.service";
import { NftStatus } from "../../database/entities/Nft";
import { BusinessException } from "../common/exception/business.exception";
import { ErrorCode } from "../common/exception/error-codes";
import { InjectQueue } from "@nestjs/bull";
import { Queue } from "bull";
import { CreateDropRequest } from "./request/create-drop.request";

@Injectable()
export class DropService {
    constructor(
        private readonly collectionService: CollectionService,
        private readonly nftService: NftService,
        @InjectRepository(Drop) private readonly dropRepository: Repository<Drop>,
        @InjectQueue("drop") private readonly dropQueue: Queue,
    ) {}

    async findAll(page = 1, pageSize = 25, filter?: DropFilter): Promise<PaginatedDropDto> {
        const take = pageSize;
        const skip = (page - 1) * take;
        const { qbWheres, relations } = DropFilter.toFilterClause(filter);

        const [entities, count] = await QueryBuilderHelper.buildFindManyAndCount(
            this.dropRepository,
            "players",
            skip,
            take,
            ["collection", "collection.user", ...relations],
            qbWheres,
        );

        return {
            items: entities.map((drop) => DropDto.fromEntity(drop)),
            pages: Math.ceil(count / take),
            currentPage: page,
        };
    }

    async findById(id: number): Promise<DropDto> {
        const drop = await this.dropRepository.findOne(id, { relations: ["collection", "collection.user"] });
        return DropDto.fromEntity(drop);
    }

    async publish(collectionId: number, ownerAddress: string, createDropRequest: CreateDropRequest): Promise<DropDto> {
        const collection = await this.collectionService.findOne(collectionId, {
            ownerAddress,
            withItems: false,
            relations: {
                nft: true,
                user: true,
            },
        });

        if (collection.nfts.some((nft) => nft.status !== NftStatus.DRAFT)) {
            throw new BusinessException(ErrorCode.COLLECTION_ALREADY_LAUNCHED);
        }

        await Promise.all(collection.nfts.map((nft) => this.nftService.updateNftStatus(nft.id, NftStatus.PENDING)));

        const drop = await this.dropRepository.save({
            ...createDropRequest,
            collectionId,
            faqs: createDropRequest.faqs,
        });

        await Promise.all(collection.nfts.map((nft) => this.nftService.setDrop(nft.id, drop.id)));

        for (const nft of collection.nfts) {
            await this.dropQueue.add("nft-mint-queue", { nftId: nft.id, price: createDropRequest.price }, { delay: 20000 });
        }
    }
}

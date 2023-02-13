import { Injectable } from "@nestjs/common";
import { TrendsDto } from "./dto/trends.dto";
import { NftService } from "../nft/nft.service";
import { CollectionService } from "../collection/collection.service";
import { UserService } from "../user/user.service";
import { Order } from "../common/types";
import { NftStatus } from "../../database/entities/Nft";
import { NftDto } from "../nft/dto/nft.dto";
import { DropService } from "../drop/drop.service";

@Injectable()
export class TrendService {
    constructor(
        private readonly nftService: NftService,
        private readonly collectionService: CollectionService,
        private readonly userService: UserService,
        private readonly dropService: DropService,
    ) {}

    async findTrends(): Promise<TrendsDto> {
        const nfts = (
            await this.nftService.findAll(
                { page: 1, pageSize: 10, order: Order.DESC, status: [NftStatus.CONFIRMED], orderField: "priority" },
                undefined,
            )
        ).items as NftDto[];
        const collections = (await this.collectionService.findAll({ page: 1, pageSize: 10, order: Order.DESC, orderField: "priority" }))
            .items;
        const drops = (await this.dropService.findAll({ page: 1, pageSize: 10, order: Order.DESC, orderField: "priority" })).items;
        const artists = await this.userService.findAll({ page: 1, pageSize: 10, order: Order.DESC, orderField: "priority" });
        return { nfts, collections, artists, drops };
    }
}

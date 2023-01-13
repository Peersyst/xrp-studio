import { Injectable } from "@nestjs/common";
import { TrendsDto } from "./dto/trends.dto";
import { NftService } from "../nft/nft.service";
import { CollectionService } from "../collection/collection.service";
import { UserService } from "../user/user.service";
import { Order } from "../common/types";
import { NftDto } from "../nft/dto/nft.dto";

@Injectable()
export class TrendService {
    constructor(
        private readonly nftService: NftService,
        private readonly collectionService: CollectionService,
        private readonly userService: UserService,
    ) {}

    async findTrends(): Promise<TrendsDto> {
        const nfts = (await this.nftService.findAll({ page: 1, pageSize: 10, order: Order.DESC })).items as NftDto[];
        const collections = (await this.collectionService.findAll({ page: 1, pageSize: 10, order: Order.DESC })).items;
        const artists = await this.userService.findAll({ page: 1, pageSize: 10, order: Order.DESC, orderField: "name" });
        return { nfts, collections, artists };
    }
}

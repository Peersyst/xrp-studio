import { Module } from "@nestjs/common";
import { TrendController } from "./trend.controller";
import { TrendService } from "./trend.service";
import { NftModule } from "../nft/nft.module";
import { CollectionModule } from "../collection/collection.module";
import { UserModule } from "../user/user.module";
import { DropModule } from "../drop/drop.module";

@Module({
    imports: [NftModule, CollectionModule, UserModule, DropModule],
    controllers: [TrendController],
    providers: [TrendService],
    exports: [],
})
export class TrendModule {}

import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Nft } from "../../database/entities/Nft";
import { NftService } from "./nft.service";
import { Collection } from "../../database/entities/Collection";
import { CollectionModule } from "../collection/collection.module";

@Module({
    imports: [TypeOrmModule.forFeature([Nft, Collection]), CollectionModule],
    controllers: [],
    providers: [NftService],
    exports: [NftService],
})
export class NftModule {}

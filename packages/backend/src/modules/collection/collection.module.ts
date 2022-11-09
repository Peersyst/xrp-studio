import { forwardRef, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Collection } from "../../database/entities/Collection";
import { CollectionService } from "./collection.service";
import { CollectionsExistsConstraint } from "./validator/CollectionsExists";
import { CollectionController } from "./collection.controller";
import { NftModule } from "../nft/nft.module";

@Module({
    imports: [TypeOrmModule.forFeature([Collection]), forwardRef(() => NftModule)],
    controllers: [CollectionController],
    providers: [CollectionService, CollectionsExistsConstraint],
    exports: [CollectionService],
})
export class CollectionModule {}

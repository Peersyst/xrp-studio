import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Collection } from "../../database/entities/Collection";
import { CollectionService } from "./collection.service";
import { CollectionsExistsConstraint } from "./validator/CollectionsExists";
import { CollectionController } from "./collection.controller";

@Module({
    imports: [TypeOrmModule.forFeature([Collection])],
    controllers: [CollectionController],
    providers: [CollectionService, CollectionsExistsConstraint],
    exports: [CollectionService],
})
export class CollectionModule {}

import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Collection } from "../../database/entities/Collection";
import { CollectionService } from "./collection.service";
import { CollectionExistsConstraint } from "./validator/CollectionExists";
import { CollectionController } from "./collection.controller";

@Module({
    imports: [TypeOrmModule.forFeature([Collection])],
    controllers: [CollectionController],
    providers: [CollectionService, CollectionExistsConstraint],
    exports: [CollectionService],
})
export class CollectionModule {}

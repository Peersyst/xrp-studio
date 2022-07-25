import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Collection } from "../../database/entities/Collection";
import { CollectionService } from "./collection.service";
import { CollectionExistsConstraint } from "./validator/CollectionExists";

@Module({
    imports: [TypeOrmModule.forFeature([Collection])],
    controllers: [],
    providers: [CollectionService, CollectionExistsConstraint],
    exports: [CollectionService],
})
export class CollectionModule {}

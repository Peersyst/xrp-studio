import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Collection } from "../../database/entities/Collection";
import { CollectionService } from "./collection.service";

@Module({
    imports: [TypeOrmModule.forFeature([Collection])],
    controllers: [],
    providers: [CollectionService],
    exports: [CollectionService],
})
export class CollectionModule {}

import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { IpfsModule } from "@peersyst/ipfs-module/src/ipfs.module";
import { BullModule } from "@nestjs/bull";
import { MetadataConsumer } from "./queue/metadata.consumer";
import { NftMetadata } from "../../database/entities/NftMetadata";
import { NftMetadataAttribute } from "../../database/entities/NftMetadataAttribute";
import { MetadataService } from "./metadata.service";

@Module({
    imports: [TypeOrmModule.forFeature([NftMetadata, NftMetadataAttribute]), BullModule.registerQueue({ name: "metadata" }), IpfsModule],
    controllers: [],
    providers: [MetadataService, MetadataConsumer],
    exports: [MetadataService],
})
export class MetadataModule {}

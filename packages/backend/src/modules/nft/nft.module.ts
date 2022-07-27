import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Nft } from "../../database/entities/Nft";
import { NftService } from "./nft.service";
import { CollectionModule } from "../collection/collection.module";
import { IpfsModule } from "@peersyst/ipfs-module/src/ipfs.module";
import { BullModule } from "@nestjs/bull";
import { MetadataConsumer } from "./queue/metadata.consumer";
import { NftController } from "./nft.controller";
import { NftMetadata } from "../../database/entities/NftMetadata";
import { NftMetadataAttribute } from "../../database/entities/NftMetadataAttribute";
import { XummModule } from "../xumm/xumm-shared-module";
import { ConfigModule, ConfigService } from "@nestjs/config";

@Module({
    imports: [
        TypeOrmModule.forFeature([Nft, NftMetadata, NftMetadataAttribute]),
        BullModule.registerQueue({ name: "metadata" }),
        CollectionModule,
        IpfsModule,
        XummModule.register(ConfigModule, ConfigService),
    ],
    controllers: [NftController],
    providers: [NftService, MetadataConsumer],
    exports: [NftService],
})
export class NftModule {}
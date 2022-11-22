import { forwardRef, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Nft } from "../../database/entities/Nft";
import { NftService } from "./nft.service";
import { CollectionModule } from "../collection/collection.module";
import { IpfsModule } from "@peersyst/ipfs-module/src/ipfs.module";
import { NftController } from "./nft.controller";
import { XummModule } from "@peersyst/xumm-module";
import { MetadataModule } from "../metadata/metadata.module";
import { UserModule } from "../user/user.module";
import { BlockchainModule } from "../blockchain/blockchain.module";

@Module({
    imports: [
        forwardRef(() => BlockchainModule),
        TypeOrmModule.forFeature([Nft]),
        forwardRef(() => CollectionModule),
        MetadataModule,
        IpfsModule,
        XummModule,
        UserModule,
    ],
    controllers: [NftController],
    providers: [NftService],
    exports: [NftService],
})
export class NftModule {}

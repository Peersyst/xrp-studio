import { forwardRef, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Nft } from "../../database/entities/Nft";
import { NftService } from "./nft.service";
import { CollectionModule } from "../collection/collection.module";
import { NftController } from "./nft.controller";
import { XummModule } from "@peersyst/xumm-module";
import { MetadataModule } from "../metadata/metadata.module";
import { UserModule } from "../user/user.module";
import { XummTransactionModule } from "../xumm/xumm-transaction.module";
import { BlockchainModule } from "../blockchain/blockchain.module";

@Module({
    imports: [
        XummTransactionModule,
        TypeOrmModule.forFeature([Nft]),
        forwardRef(() => CollectionModule),
        MetadataModule,
        XummModule,
        UserModule,
        forwardRef(() => BlockchainModule),
    ],
    controllers: [NftController],
    providers: [NftService],
    exports: [NftService],
})
export class NftModule {}

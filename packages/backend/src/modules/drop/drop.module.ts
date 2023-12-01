import { Module } from "@nestjs/common";
import { DropController } from "./drop.controller";
import { XummTransactionModule } from "../xumm/xumm-transaction.module";
import { BlockchainModule } from "../blockchain/blockchain.module";
import { CollectionModule } from "../collection/collection.module";
import { NftModule } from "../nft/nft.module";
import { MetadataModule } from "../metadata/metadata.module";
import { BullModule } from "@nestjs/bull";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Drop } from "../../database/entities/Drop";
import { NftInDrop } from "../../database/entities/NftInDrop";
import { DropService } from "./drop.service";
import { DropConsumer } from "./queue/drop.consumer";
import { UserModule } from "../user/user.module";

@Module({
    imports: [
        XummTransactionModule,
        BlockchainModule,
        CollectionModule,
        NftModule,
        MetadataModule,
        BullModule.registerQueue({ name: "transaction-status" }),
        BullModule.registerQueue({ name: "drop" }),
        TypeOrmModule.forFeature([Drop, NftInDrop]),
        UserModule,
    ],
    controllers: [DropController],
    providers: [DropService, DropConsumer],
    exports: [DropService],
})
export class DropModule {}

import { forwardRef, Module } from "@nestjs/common";
import { NftModule } from "../nft/nft.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserModule } from "../user/user.module";
import { Offer } from "../../database/entities/Offer";
import { OfferService } from "./offer.service";
import { BlockchainModule } from "../blockchain/blockchain.module";
import { BullModule } from "@nestjs/bull";
import { OfferConsumer } from "./queue/offer.consumer";
import { OfferController } from "./offer.controller";
import { XummTransactionModule } from "../xumm/xumm-transaction.module";

@Module({
    imports: [
        forwardRef(() => BlockchainModule),
        forwardRef(() => NftModule),
        UserModule,
        XummTransactionModule,
        BullModule.registerQueue({ name: "offer" }),
        TypeOrmModule.forFeature([Offer]),
    ],
    controllers: [OfferController],
    providers: [OfferService, OfferConsumer],
    exports: [OfferService],
})
export class OfferModule {}

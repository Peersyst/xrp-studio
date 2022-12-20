import { forwardRef, Module } from "@nestjs/common";
import { NftModule } from "../nft/nft.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserModule } from "../user/user.module";
import { Offer } from "../../database/entities/Offer";
import { OfferService } from "./offer.service";
import { BlockchainModule } from "../blockchain/blockchain.module";

@Module({
    imports: [forwardRef(() => BlockchainModule), forwardRef(() => NftModule), UserModule, TypeOrmModule.forFeature([Offer])],
    providers: [OfferService],
    exports: [OfferService],
})
export class OfferModule {}

import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Nft } from "../../database/entities/Nft";
import { NftService } from "./nft.service";

@Module({
    imports: [TypeOrmModule.forFeature([Nft])],
    controllers: [],
    providers: [NftService],
    exports: [NftService],
})
export class NftModule {}

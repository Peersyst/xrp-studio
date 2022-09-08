import { Module } from "@nestjs/common";
import { BullModule } from "@nestjs/bull";
import { TypeOrmModule } from "@nestjs/typeorm";
import { LastIndexedLedger } from "../../database/entities/LastIndexedLedger";
import { BlockchainService } from "./blockchain.service";
import { LedgerConsumer } from "./queue/ledger.consumer";
import { TransactionsConsumer } from "./queue/transactions.consumer";
import { NftModule } from "../nft/nft.module";

@Module({
    imports: [
        TypeOrmModule.forFeature([LastIndexedLedger]),
        BullModule.registerQueue({ name: "ledger" }),
        BullModule.registerQueue({ name: "transactions" }),
        NftModule,
    ],
    controllers: [],
    providers: [BlockchainService, LedgerConsumer, TransactionsConsumer],
    exports: [BlockchainService],
})
export class BlockchainModule {}

import { forwardRef, Module } from "@nestjs/common";
import { BullModule } from "@nestjs/bull";
import { TypeOrmModule } from "@nestjs/typeorm";
import { LastIndexedLedger } from "../../database/entities/LastIndexedLedger";
import { BlockchainService } from "./blockchain.service";
import { LedgerConsumer } from "./queue/ledger.consumer";
import { TransactionsConsumer } from "./queue/transactions.consumer";
import { NftModule } from "../nft/nft.module";
import { BlockchainTransactionService } from "./blockchain-transaction.service";
import { TransactionStatusConsumer } from "./queue/transaction-status.consumer";
import { OfferModule } from "../offer/offer.module";

@Module({
    imports: [
        forwardRef(() => OfferModule),
        TypeOrmModule.forFeature([LastIndexedLedger]),
        BullModule.registerQueue({ name: "ledger" }),
        BullModule.registerQueue({ name: "transactions" }),
        BullModule.registerQueue({ name: "transaction-status" }),
        BullModule.registerQueue({ name: "drop" }),
        BullModule.registerQueue({ name: "offer" }),
        BullModule.registerQueue({ name: "metadata" }),
        forwardRef(() => NftModule),
    ],
    controllers: [],
    providers: [BlockchainService, BlockchainTransactionService, LedgerConsumer, TransactionsConsumer, TransactionStatusConsumer],
    exports: [BlockchainService, BlockchainTransactionService],
})
export class BlockchainModule {}

import { Module } from "@nestjs/common";
import { BullModule } from "@nestjs/bull";
import { TypeOrmModule } from "@nestjs/typeorm";
import { LastIndexedLedger } from "../../database/entities/LastIndexedLedger";
import { BlockchainService } from "./blockchain.service";
import { LedgerConsumer } from "./queue/ledger.consumer";

@Module({
    imports: [TypeOrmModule.forFeature([LastIndexedLedger]), BullModule.registerQueue({ name: "ledger" })],
    controllers: [],
    providers: [BlockchainService, LedgerConsumer],
    exports: [BlockchainService],
})
export class BlockchainModule {}

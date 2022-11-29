import { Module } from "@nestjs/common";
import { XummModule } from "@peersyst/xumm-module";
import { XummTransactionService } from "./xumm-transaction.service";

@Module({
    imports: [XummModule],
    controllers: [],
    providers: [XummTransactionService],
    exports: [XummTransactionService],
})
export class XummTransactionModule {}

import { Logger } from "@nestjs/common";
import { InjectQueue, Process, Processor } from "@nestjs/bull";
import { Job, Queue } from "bull";
import { BlockchainService, INDEX_LEDGER_JOB_CONCURRENCY } from "../blockchain.service";

@Processor("ledger")
export class LedgerConsumer {
    private readonly logger = new Logger(LedgerConsumer.name);

    constructor(
        private readonly blockchainService: BlockchainService,
        @InjectQueue("transactions") private readonly transactionsQueue: Queue,
    ) {}

    /**
     * Indexes ledgers and sends their transactions to the transactions queue
     * @param index
     */
    @Process({ name: "index-ledger", concurrency: INDEX_LEDGER_JOB_CONCURRENCY })
    async indexLedger({ data: { index } }: Job<{ index: number }>) {
        this.logger.log(`CONSUMING LEDGER ${index}`);

        try {
            const ledger = await this.blockchainService.getLedger(index);
            if (ledger.validated) {
                this.logger.log(`INDEXED LEDGER ${index}`);
                await this.transactionsQueue.add("process-transactions", {
                    transactions: ledger.transactions,
                    ledgerIndex: index,
                });
                await this.blockchainService.setCurrentLedgerIndex(index + 1);
                await this.blockchainService.indexLedger(index + INDEX_LEDGER_JOB_CONCURRENCY);
            } else {
                this.logger.log(`LEDGER INDEX ${index} NOT VALIDATED YET`);
                await this.blockchainService.indexLedger(index, 3000);
            }
        } catch (e) {
            // Error code 21 means the ledger was not found
            if (e.data.error_code === 21) this.logger.log(`LEDGER INDEX ${index} NOT FOUND`);
            else
                this.logger.error(`FAILED INDEXING LEDGER ${index}
the error was: ${e}`);
            await this.blockchainService.indexLedger(index, 3000);
        }
    }
}

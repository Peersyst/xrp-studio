import { InjectQueue, Process, Processor } from "@nestjs/bull";
import { Logger } from "@nestjs/common";
import { Job, Queue } from "bull";
import { BlockchainTransactionService, TransactionStatus } from "../blockchain-transaction.service";

@Processor("transaction-status")
export class TransactionStatusConsumer {
    private readonly logger = new Logger(TransactionStatusConsumer.name);

    constructor(
        @InjectQueue("transaction-status") private readonly transactionStatusQueue: Queue,
        private readonly blockchainTransactionService: BlockchainTransactionService,
    ) {}

    @Process("track-status")
    async trackStatus({ data: { hash } }: Job<{ hash: string }>) {
        this.logger.log(`[track-status] consuming transaction ${hash}`);
        try {
            const { status, error = "" } = await this.blockchainTransactionService.getTransactionStatus(hash);
            if (status === TransactionStatus.UNCONFIRMED) {
                this.logger.log(`[track-status] re-queuing unconfirmed transaction ${hash}`);
                return await this.transactionStatusQueue.add("track-status", { hash }, { delay: 3500 });
            } else if (status === TransactionStatus.CONFIRMED) {
                this.logger.log(`[track-status] transaction ${hash} is confirmed`);
            } else {
                this.logger.error(`[track-status] transaction ${hash} has failed with error ${error}`);
            }
        } catch (e) {
            this.logger.error(`[track-status] tracking status of transaction ${hash} with error ${JSON.stringify(e)}`);
            return await this.transactionStatusQueue.add("track-status", { hash }, { delay: 5000 });
        }
    }
}

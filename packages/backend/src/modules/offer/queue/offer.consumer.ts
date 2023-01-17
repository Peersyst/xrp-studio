import { InjectQueue, Process, Processor } from "@nestjs/bull";
import { Inject, Logger } from "@nestjs/common";
import { Job, Queue } from "bull";
import { NFTokenAcceptOffer, NFTokenCreateOffer } from "xrpl";
import { OfferService } from "../offer.service";
import { ValidatedLedgerTransaction } from "../../blockchain/types";

@Processor("offer")
export class OfferConsumer {
    private readonly logger = new Logger(OfferConsumer.name);

    constructor(
        @Inject(OfferService) private readonly offerService: OfferService,
        @InjectQueue("offer") private readonly offerQueue: Queue,
    ) {}

    @Process("process-accept-offer-transaction")
    async processAcceptOfferTransactionQueue({
        data: { transaction },
        opts,
    }: Job<{ transaction: ValidatedLedgerTransaction<NFTokenAcceptOffer> }>) {
        this.logger.debug(`[process-accept-offer-transaction] entering with ${JSON.stringify({ transaction })}`);
        try {
            await this.offerService.processAcceptOfferTransaction(transaction);
            this.logger.log(`[process-accept-offer-transaction] processed accept offer on transaction ${transaction.hash})}`);
        } catch (e) {
            this.logger.warn(
                `[process-accept-offer-transaction] failed for ${JSON.stringify({ transaction })} with error ${JSON.stringify(e)}`,
            );
            await this.offerQueue.add(
                "process-accept-offer-transaction",
                { transaction },
                { priority: opts.priority, delay: (opts.delay || 500) * 2 },
            );
        }
    }

    @Process("process-create-offer-transaction")
    async processCreateOfferTransactionQueue({
        data: { transaction },
        opts,
    }: Job<{ transaction: ValidatedLedgerTransaction<NFTokenCreateOffer> }>) {
        this.logger.debug(`[process-create-offer-transaction] entering with ${JSON.stringify({ transaction })}`);
        try {
            await this.offerService.processCreateOfferTransaction(transaction);
            this.logger.log(`[process-create-offer-transaction] processed create offer on transaction ${transaction.hash})}`);
        } catch (e) {
            this.logger.warn(
                `[process-create-offer-transaction] failed for ${JSON.stringify({ transaction })} with error ${JSON.stringify(e)}`,
            );
            await this.offerQueue.add(
                "process-create-offer-transaction",
                { transaction },
                { priority: opts.priority, delay: (opts.delay || 500) * 2 },
            );
        }
    }
}

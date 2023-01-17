import { Process, Processor } from "@nestjs/bull";
import { Inject, Logger } from "@nestjs/common";
import { Job } from "bull";
import { NFTokenAcceptOffer, NFTokenCreateOffer } from "xrpl";
import { OfferService } from "../offer.service";
import { ValidatedLedgerTransaction } from "../../blockchain/types";

@Processor("offer")
export class OfferConsumer {
    private readonly logger = new Logger(OfferConsumer.name);

    constructor(@Inject(OfferService) private readonly offerService: OfferService) {}

    @Process("process-accept-offer-transaction")
    async processAcceptOfferTransactionQueue({
        data: { transaction },
    }: Job<{ transaction: ValidatedLedgerTransaction<NFTokenAcceptOffer> }>) {
        this.logger.debug(`[process-accept-offer-transaction] entering with ${JSON.stringify({ transaction })}`);
        try {
            await this.offerService.processAcceptOfferTransaction(transaction);
            this.logger.log(`[process-accept-offer-transaction] processed accept offer on transaction ${transaction.hash})}`);
        } catch (e) {
            this.logger.error(
                `[process-accept-offer-transaction] failed for ${JSON.stringify({ transaction })} with error ${JSON.stringify(e)}`,
            );
        }
    }

    @Process("process-create-offer-transaction")
    async processCreateOfferTransactionQueue({
        data: { transaction },
    }: Job<{ transaction: ValidatedLedgerTransaction<NFTokenCreateOffer> }>) {
        this.logger.debug(`[process-create-offer-transaction] entering with ${JSON.stringify({ transaction })}`);
        try {
            await this.offerService.processCreateOfferTransaction(transaction);
            this.logger.log(`[process-create-offer-transaction] processed create offer on transaction ${transaction.hash})}`);
        } catch (e) {
            this.logger.error(
                `[process-create-offer-transaction] failed for ${JSON.stringify({ transaction })} with error ${JSON.stringify(e)}`,
            );
        }
    }
}

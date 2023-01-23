import { Logger } from "@nestjs/common";
import { InjectQueue, Process, Processor } from "@nestjs/bull";
import { Job, Queue } from "bull";
import { NftService } from "../../nft/nft.service";
import { NftStatus } from "../../../database/entities/Nft";
import { DropService } from "../drop.service";
import { BlockchainService } from "../../blockchain/blockchain.service";
import { BlockchainTransactionService } from "../../blockchain/blockchain-transaction.service";
import { NFTokenAcceptOffer } from "xrpl";
import { ValidatedLedgerTransaction } from "../../blockchain/types";

@Processor("drop")
export class DropConsumer {
    private readonly logger = new Logger(DropConsumer.name);

    constructor(
        private readonly nftService: NftService,
        private readonly dropService: DropService,
        private readonly blockchainService: BlockchainService,
        private readonly blockchainTransactionService: BlockchainTransactionService,
        @InjectQueue("drop") private readonly dropQueue: Queue,
        @InjectQueue("transaction-status") private readonly transactionStatusQueue: Queue,
    ) {}

    @Process("nft-mint-queue")
    async nftMintQueue({ data: { nftId, tries = 1 } }: Job<{ nftId: number; tries?: number }>) {
        this.logger.debug(`[nft-mint-queue] entering with ${JSON.stringify({ nftId, tries })}`);
        try {
            const nft = await this.nftService.findOne(nftId, { relations: ["user"] });
            if (!(await this.blockchainService.isAccountAuthorized(nft.user?.address))) {
                this.logger.log(`[nft-mint-queue] user not authorized minter yet, re-queuing with ${JSON.stringify({ nftId, tries })}`);
                return this.dropQueue.add("nft-mint-queue", { nftId, tries: tries + 1 }, { delay: tries * 2000 });
            }
            this.logger.log(`[nft-mint-queue] minting nft ${JSON.stringify({ nftId, tries })}`);
            await this.dropService.mintNftInDrop(nftId);
        } catch (e) {
            this.logger.error(`[nft-mint-queue] failed for ${JSON.stringify({ nftId, tries })} with error ${JSON.stringify(e)}`);
        }
    }

    @Process("nft-sell-offer-queue")
    async nftSellOfferQueue({ data: { nftId } }: Job<{ nftId: number }>) {
        this.logger.debug(`[nft-sell-offer-queue] entering with ${JSON.stringify({ nftId })}`);
        try {
            const nft = await this.nftService.findOne(nftId);
            if (nft.status !== NftStatus.CONFIRMED) {
                await this.dropQueue.add("nft-sell-offer-queue", { nftId }, { delay: 5000 });
                return this.logger.log(`[nft-sell-offer-queue] nft not minted yet, re-queuing with ${JSON.stringify({ nftId })}`);
            }
            this.logger.log(`[nft-sell-offer-queue] nft minted, creating sell offer for ${JSON.stringify({ nftId })}`);
            await this.dropService.sellNftInDrop(nftId);
        } catch (e) {
            this.logger.error(`[nft-mint-queue] failed for ${JSON.stringify({ nftId })} with error ${JSON.stringify(e)}`);
        }
    }

    @Process("fetch-offer-id-queue")
    async fetchOfferIdQueue({ data: { nftId } }: Job<{ nftId: number }>) {
        this.logger.debug(`[fetch-offer-id-queue] entering with ${JSON.stringify({ nftId })}`);
        try {
            this.logger.debug(`[fetch-offer-id-queue] fetching offer id ${JSON.stringify({ nftId })}`);
            const offerId = await this.dropService.fetchOfferId(nftId);
            if (offerId) this.logger.log(`[fetch-offer-id-queue] fetched offer id ${offerId} for ${JSON.stringify({ nftId })}`);
            else await this.dropQueue.add("fetch-offer-id-queue", { nftId }, { delay: 5000 });
        } catch (e) {
            this.logger.error(`[fetch-offer-id-queue] failed for ${JSON.stringify({ nftId })} with error ${JSON.stringify(e)}`);
            await this.dropQueue.add("fetch-offer-id-queue", { nftId }, { delay: 5000 });
        }
    }

    @Process("process-accept-offer-transaction")
    async processAcceptOfferTransactionQueue({
        data: { transaction, tries = 0 },
    }: Job<{ transaction: ValidatedLedgerTransaction<NFTokenAcceptOffer>; tries?: number }>) {
        this.logger.debug(`[process-accept-offer-transaction] entering with ${JSON.stringify({ transaction })}`);
        try {
            const nftId = await this.dropService.processAcceptOfferTransaction(transaction);
            if (!nftId && tries > 3) {
                // Skip transaction but retry it just in case that the offer id is not fetched yet
                return this.dropQueue.add("process-accept-offer-transaction", { transaction, tries: tries + 1 }, { delay: 60000 });
            } else if (nftId) this.logger.log(`[process-accept-offer-transaction] nft ${JSON.stringify({ nftId })} sold`);
        } catch (e) {
            this.logger.error(
                `[process-accept-offer-transaction] failed for ${JSON.stringify({ transaction })} with error ${JSON.stringify(e)}`,
            );
        }
    }

    @Process("nft-funding-queue")
    async nftSoldQueue({ data: { nftId } }: Job<{ nftId: number }>) {
        this.logger.debug(`[nft-funding-queue] entering with ${JSON.stringify({ nftId })}`);
        try {
            const isFunded = await this.dropService.fundForNftSold(nftId);
            if (isFunded) this.logger.log(`[nft-funding-queue] nft ${JSON.stringify({ nftId })} funded`);
            else {
                this.logger.log(`[nft-funding-queue] re-queuing nft ${JSON.stringify({ nftId })} is not funded yet`);
                await this.dropQueue.add("nft-funding-queue", { nftId }, { delay: 10000 });
            }
        } catch (e) {
            this.logger.error(`[nft-funding-queue] failed for ${JSON.stringify({ nftId })} with error ${JSON.stringify(e)}`);
        }
    }
}

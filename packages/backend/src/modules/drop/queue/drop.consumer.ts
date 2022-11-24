import { Logger } from "@nestjs/common";
import { InjectQueue, Process, Processor } from "@nestjs/bull";
import { Job, Queue } from "bull";
import { NftService } from "../../nft/nft.service";
import { NftStatus } from "../../../database/entities/Nft";
import { DropService } from "../drop.service";
import { BlockchainService } from "../../blockchain/blockchain.service";
import { BlockchainTransactionService } from "../../blockchain/blockchain-transaction.service";

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
                this.logger.debug(`[nft-mint-queue] re-queuing with ${JSON.stringify({ nftId, tries })}`);
                return this.dropQueue.add("nft-mint-queue", { nftId, tries: tries + 1 }, { delay: tries * 2000 });
            }
            this.logger.debug(`[nft-mint-queue] minting nft ${JSON.stringify({ nftId, tries })}`);
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
                await this.dropQueue.add("nft-sell-offer-queue", { nftId }, { delay: 1000 });
                return this.logger.debug(`[nft-sell-offer-queue] re-queuing with ${JSON.stringify({ nftId })}`);
            }
            await this.dropService.sellNftInDrop(nftId);
        } catch (e) {
            this.logger.error(`[nft-mint-queue] failed for ${JSON.stringify({ nftId })} with error ${JSON.stringify(e)}`);
        }
    }

    @Process("nft-sold-queue")
    async nftSoldQueue({ data: { nftId } }: Job<{ nftId: number }>) {
        this.logger.debug(`[nft-sold-queue] entering with ${JSON.stringify({ nftId })}`);
        try {
            const isSold = await this.dropService.checkNftSold(nftId);
            if (isSold) this.logger.log(`[nft-sold-queue] nft ${JSON.stringify({ nftId })} sold`);
            else {
                this.logger.log(`[nft-sold-queue] re-queuing nft ${JSON.stringify({ nftId })} is not sold yet`);
                await this.dropQueue.add("nft-sold-queue", { nftId }, { delay: 10000 });
            }
        } catch (e) {
            this.logger.error(`[nft-sold-queue] failed for ${JSON.stringify({ nftId })} with error ${JSON.stringify(e)}`);
        }
    }
}

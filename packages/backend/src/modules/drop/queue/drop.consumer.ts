import { Logger } from "@nestjs/common";
import { InjectQueue, Process, Processor } from "@nestjs/bull";
import { Job, Queue } from "bull";
import { NftService } from "../../nft/nft.service";
import { NftDto } from "../../nft/dto/nft.dto";
import { NftStatus } from "../../../database/entities/Nft";
import { DropService } from "../drop.service";

interface IBlockchainService {
    isMarketApproved(issuer: string): Promise<boolean>;
    isSellOfferMatched(sellOfferIdentifier: string): Promise<boolean>;
    prepareAuthorizedMintTransaction(nft: NftDto): Promise<NftMintTransaction>;
    prepareSellOfferTransaction(nft: NftDto, price: string): Promise<NftSellOfferTransaction>;
}

@Processor("drop")
export class DropConsumer {
    private readonly logger = new Logger(DropConsumer.name);
    private readonly blockchainService: IBlockchainService;

    constructor(
        private readonly nftService: NftService,
        private readonly dropService: DropService,
        @InjectQueue("drop") private readonly dropQueue: Queue,
        @InjectQueue("process-transaction") private readonly processTransactionQueue: Queue,
    ) {}

    @Process("nft-mint-queue")
    async nftMintQueue({ data: { nftId, price, tries = 1 } }: Job<{ nftId: number; price: string; tries?: number }>) {
        this.logger.debug(`[nft-mint-queue] entering with ${{ nftId, tries, price }}`);
        try {
            const nft = await this.nftService.findOne(nftId);
            if (!(await this.blockchainService.isMarketApproved(nft.user.address))) {
                await this.dropQueue.add("nft-mint-queue", { nftId, price, tries: tries + 1 }, { delay: tries * 2000 });
                return this.logger.debug(`[nft-mint-queue] re-queuing with ${{ nftId, tries, price }}`);
            }
            const transaction = await this.nftService.publishDraftAsAuthorizedMinter(nft, this.dropService.);
            await this.processTransactionQueue.add("sign-transaction", { transaction });
            await this.dropQueue.add("nft-sell-offer-queue", { nftId, price });
        } catch (e) {
            this.logger.error(`[nft-mint-queue] failed for ${{ nftId, price, tries }} with error ${e}`);
        }
    }

    @Process("nft-sell-offer-queue")
    async nftSellOfferQueue({ data: { nftId, price } }: Job<{ nftId: number; price: string }>) {
        this.logger.debug(`[nft-sell-offer-queue] entering with ${{ nftId, price }}`);
        try {
            const nft = await this.nftService.findOne(nftId);
            if (nft.status !== NftStatus.CONFIRMED) {
                await this.dropQueue.add("nft-sell-offer-queue", { nftId }, { delay: 1000 });
                return this.logger.debug(`[nft-sell-offer-queue] re-queuing with ${{ nftId }}`);
            }
            const transaction = await this.blockchainService.prepareSellOfferTransaction(nft, price);
            await this.processTransactionQueue.add("sign-transaction", { transaction });
            await this.dropQueue.add("nft-sell-offer-queue", { nftId });
        } catch (e) {
            this.logger.error(`[nft-mint-queue] failed for ${{ nftId, price }} with error ${e}`);
        }
    }

    @Process("nft-sold-queue")
    async nftSoldQueue({ data: { nftId, price } }: Job<{ nftId: number; price: string }>) {
        this.logger.debug(`[nft-sold-queue] entering with ${{ nftId, price }}`);
    }
}

import { forwardRef, Inject, Injectable, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { LastIndexedLedger } from "../../database/entities/LastIndexedLedger";
import { Repository } from "typeorm";
import { InjectQueue } from "@nestjs/bull";
import { Queue } from "bull";
import { Client, Wallet } from "xrpl";
import { ConfigService } from "@nestjs/config";
import { LedgerResponse } from "xrpl/dist/npm/models/methods";
import { ValidatedLedgerTransaction } from "./types";
import { OfferService } from "../offer/offer.service";

export const INDEX_LEDGER_JOB_CONCURRENCY = 4;

/**
 * Service in charge of all blockchain related stuff
 */
@Injectable()
export class BlockchainService {
    private readonly xrpClient: Client;
    public readonly mintingAddress: string;
    private readonly logger = new Logger(BlockchainService.name);

    constructor(
        @InjectRepository(LastIndexedLedger) private readonly lastIndexedLedgerRepository: Repository<LastIndexedLedger>,
        @InjectQueue("ledger") private readonly ledgerQueue: Queue,
        @InjectQueue("transactions") private readonly transactionsQueue: Queue,
        @InjectQueue("drop") private readonly dropQueue: Queue,
        @InjectQueue("offer") private readonly offerQueue: Queue,
        @InjectQueue("metadata") private readonly metadataQueue: Queue,
        private readonly configService: ConfigService,
        @Inject(forwardRef(() => OfferService)) private readonly offerService: OfferService,
    ) {
        const xrpNode = this.configService.get<string>("xrp.node");
        this.xrpClient = new Client(xrpNode);
        this.mintingAddress = Wallet.fromSecret(this.configService.get("xrp.minterSecret")).address;
    }

    /**
     * Connects to xrp ws and starts indexing ledgers
     */
    async onApplicationBootstrap(): Promise<void> {
        // We can leave the xrp ws connected indefinitely as we are making requests every ~3 seconds, it will not timeout
        await this.ledgerQueue.empty();
        await this.pauseTransactionQueues();
        await this.xrpClient.connect();
        const currentIndexedLedgerIndex = await this.getCurrentLedgerIndex();
        const index = currentIndexedLedgerIndex || (await this.getFirstLedgerIndex());
        for (let i = 0; i < INDEX_LEDGER_JOB_CONCURRENCY; i++) {
            await this.ledgerQueue.add("index-ledger", { index: index + i }, { priority: index });
        }
    }

    async pauseTransactionQueues(): Promise<void> {
        this.logger.log("Pausing transaction processor queues for indexing focus");
        await this.dropQueue.pause();
        await this.offerQueue.pause();
    }

    async resumeTransactionQueues(): Promise<void> {
        this.logger.log("Resuming transaction processor queues");
        if (await this.dropQueue.isPaused()) await this.dropQueue.resume();
        if (await this.offerQueue.isPaused()) await this.offerQueue.resume();
    }

    /**
     * Sends a ledger to the ledger queue
     * @param index
     * @param delay
     */
    async indexLedger(index: number, delay?: number): Promise<void> {
        await this.ledgerQueue.add("index-ledger", { index }, { delay, priority: index });
    }

    /**
     * Gets db current ledger index
     */
    async getCurrentLedgerIndex(): Promise<number | undefined> {
        const lastLedger = await this.lastIndexedLedgerRepository.findOne({ where: { id: 1 } });
        return lastLedger?.index;
    }

    async getFirstLedgerIndex(): Promise<number> {
        const res = await this.xrpClient.request({
            command: "server_info",
        });
        const completeLedgerRanges = res.result.info.complete_ledgers.split(",");
        const lastCompleteLedgerRange = completeLedgerRanges[completeLedgerRanges.length - 1];
        const startingLedgerServer = Number(lastCompleteLedgerRange.split("-")[0]);
        const startingLedgerConfig = this.configService.get<number>("xrp.startingLedgerIndex");
        return startingLedgerConfig > startingLedgerServer ? startingLedgerConfig : startingLedgerServer;
    }

    async getMintedTokens(account: string, ledgerIndex: number): Promise<number | undefined> {
        const res = await this.xrpClient.request({
            command: "account_info",
            account: account,
            strict: true,
            ledger_index: ledgerIndex,
        });
        return res.result.account_data["MintedNFTokens"];
    }

    /**
     * Sets db current ledger index
     * @param index
     */
    async setCurrentLedgerIndex(index: number): Promise<number> {
        const lastLedger = await this.lastIndexedLedgerRepository.save({ id: 1, index });
        return lastLedger.index;
    }

    /**
     * Gets a ledger with transactions from xrp
     * @param index
     */
    async getLedger(index: number): Promise<LedgerResponse["result"]["ledger"] & { validated?: boolean }> {
        const res = await this.xrpClient.request({
            command: "ledger",
            ledger_index: index,
            transactions: true,
            expand: true,
        });
        const { ledger, validated } = res.result;
        return { ...ledger, validated };
    }

    /**
     * Processes a transaction by its type
     */
    async processTransactionByType(transaction: ValidatedLedgerTransaction): Promise<void> {
        if (transaction.metaData.TransactionResult !== "tesSUCCESS") return;
        // this.logger.debug(`Processing transaction ${JSON.stringify(transaction)}`);
        if (transaction.TransactionType === "NFTokenMint") {
            await this.transactionsQueue.add(
                "process-mint-transaction",
                { transaction },
                {
                    attempts: 3,
                    backoff: 60000,
                },
            );
        } else if (transaction.TransactionType === "NFTokenAcceptOffer") {
            await this.dropQueue.add(
                "process-accept-offer-transaction",
                { transaction },
                {
                    attempts: 3,
                    backoff: 60000,
                },
            );
            await this.offerQueue.add("process-accept-offer-transaction", { transaction });
        } else if (transaction.TransactionType === "NFTokenCreateOffer") {
            await this.offerQueue.add("process-create-offer-transaction", { transaction });
        }
    }

    async isAccountAuthorized(account: string): Promise<boolean> {
        const res = await this.xrpClient.request({
            command: "account_info",
            account: account,
        });
        return res.result.account_data["NFTokenMinter"] === this.mintingAddress;
    }
}

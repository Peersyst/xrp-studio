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

export const INDEX_LEDGER_JOB_CONCURRENCY = 1;

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
        private readonly configService: ConfigService,
        @Inject(forwardRef(() => OfferService)) private readonly offerService: OfferService,
    ) {
        const xrpNode = this.configService.get<string>("xrp.node");
        this.xrpClient = new Client(xrpNode);
        this.mintingAddress = Wallet.fromSecret(this.configService.get("xrp.minterSecret")).address;
    }

    async getPendingIndexedLedgers(firstValidatedLedger: number, lastValidatedLedger: number): Promise<number[]> {
        const missingLedgers: number[] = [];

        const firstIndexedLedger = await this.lastIndexedLedgerRepository.findOne({ order: { ledger: "ASC" } });

        // No indexed ledgers
        if (!firstIndexedLedger) {
            for (let ledger = firstValidatedLedger; ledger < lastValidatedLedger; ledger++) {
                missingLedgers.push(ledger);
            }
            return missingLedgers;
        }

        // Some indexed ledgers
        for (let ledger = firstValidatedLedger; ledger < firstIndexedLedger.ledger; ledger++) {
            missingLedgers.push(ledger);
        }

        const gaps = await this.lastIndexedLedgerRepository.query(`select ledger + 1 as gap_start, next_nr - 1 as gap_end
            from (select ledger, lead(ledger) over (order by ledger) as next_nr from last_indexed_ledger) nr
            where ledger + 1 <> next_nr;`);

        for (const { gap_start, gap_end } of gaps) {
            for (let ledger = gap_start; ledger <= gap_end; ledger++) {
                missingLedgers.push(ledger);
            }
        }

        const lastIndexedLedger = await this.lastIndexedLedgerRepository.findOne({ order: { ledger: "DESC" } });

        for (let ledger = lastIndexedLedger.ledger; ledger <= lastValidatedLedger; ledger++) {
            missingLedgers.push(ledger);
        }

        return missingLedgers;
    }

    /**
     * Connects to xrp ws and starts indexing ledgers
     */
    async onApplicationBootstrap(): Promise<void> {
        // We can leave the xrp ws connected indefinitely as we are making requests every ~3 seconds, it will not timeout
        await this.xrpClient.connect();

        await this.ledgerQueue.empty();

        await this.pauseTransactionQueues();

        const firstValidatedLedger = await this.getFirstValidatedLedger();
        const lastValidatedLedger = await this.getLastValidatedLedger();
        const missingLedgers = await this.getPendingIndexedLedgers(firstValidatedLedger, lastValidatedLedger);

        this.indexPendingLedgers(missingLedgers);
        this.queueLedgers(lastValidatedLedger);
    }

    async indexPendingLedgers(missingLedgers: number[]) {
        for (const ledger of missingLedgers) {
            await this.indexLedger(ledger);
        }
    }

    async queueLedgers(lastQueuedLedger: number): Promise<void> {
        // eslint-disable-next-line no-constant-condition
        while (true) {
            await new Promise((resolve) => setTimeout(resolve, 1000));
            const lastValidatedLedger = await this.getLastValidatedLedger();
            if (lastQueuedLedger < lastValidatedLedger) {
                for (let ledger = lastQueuedLedger + 1; ledger <= lastValidatedLedger; ledger++) {
                    await this.indexLedger(ledger);
                }
            }
            lastQueuedLedger = lastValidatedLedger;
        }
    }

    async pauseTransactionQueues(): Promise<void> {
        this.logger.log("Pausing transaction processor queues for indexing focus");
        await this.dropQueue.pause();
    }

    async resumeTransactionQueues(): Promise<void> {
        if (await this.dropQueue.isPaused()) await this.dropQueue.resume();
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
    async getLastValidatedLedger(): Promise<number> {
        const res = await this.xrpClient.request({
            command: "ledger_current",
        });
        return res.result.ledger_current_index;
    }

    async getFirstValidatedLedger(): Promise<number> {
        const res = await this.xrpClient.request({
            command: "server_info",
        });
        const completeLedgerRanges = res.result.info.complete_ledgers.split(",");
        const lastCompleteLedgerRange = completeLedgerRanges[completeLedgerRanges.length - 1];
        const startingLedgerServer = Number(lastCompleteLedgerRange.split("-")[0]);
        const startingLedgerConfig = this.configService.get<number>("xrp.startingLedgerIndex");
        return startingLedgerConfig > startingLedgerServer ? startingLedgerConfig : startingLedgerServer;
    }

    /**
     * Sets db current ledger index
     * @param index
     */
    async setLedgerAsValidated(index: number): Promise<void> {
        await this.lastIndexedLedgerRepository.save({ ledger: index });
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
    async processTransactionByType(transaction: ValidatedLedgerTransaction, ledgerIndex: number): Promise<void> {
        if (transaction.metaData.TransactionResult !== "tesSUCCESS") return;
        // this.logger.debug(`Processing transaction ${JSON.stringify(transaction)}`);
        if (transaction.TransactionType === "NFTokenMint") {
            await this.transactionsQueue.add(
                "process-mint-transaction",
                { transaction },
                {
                    attempts: 3,
                    backoff: 60000,
                    priority: ledgerIndex,
                },
            );
        } else if (transaction.TransactionType === "NFTokenAcceptOffer") {
            await this.dropQueue.add(
                "process-accept-offer-transaction",
                { transaction },
                {
                    attempts: 3,
                    backoff: 60000,
                    priority: ledgerIndex,
                },
            );
            await this.offerQueue.add("process-accept-offer-transaction", { transaction }, { priority: ledgerIndex, delay: 3500 });
        } else if (transaction.TransactionType === "NFTokenCreateOffer") {
            await this.offerQueue.add("process-create-offer-transaction", { transaction }, { priority: ledgerIndex, delay: 3500 });
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

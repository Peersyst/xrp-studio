import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { LastIndexedLedger } from "../../database/entities/LastIndexedLedger";
import { Repository } from "typeorm";
import { InjectQueue } from "@nestjs/bull";
import { Queue } from "bull";
import { Client } from "xrpl";
import { ConfigService } from "@nestjs/config";
import { LedgerResponse } from "xrpl/dist/npm/models/methods";
import { ValidatedLedgerTransaction } from "./types";

/**
 * Service in charge of all blockchain related stuff
 */
@Injectable()
export class BlockchainService {
    private readonly xrpClient: Client;

    constructor(
        @InjectRepository(LastIndexedLedger) private readonly lastIndexedLedgerRepository: Repository<LastIndexedLedger>,
        @InjectQueue("ledger") private readonly ledgerQueue: Queue,
        @InjectQueue("transactions") private readonly transactionsQueue: Queue,
        private readonly configService: ConfigService,
    ) {
        const xrpNode = this.configService.get<string>("xrp.node");
        this.xrpClient = new Client(xrpNode);
    }

    /**
     * Connects to xrp ws and starts indexing ledgers
     */
    async onApplicationBootstrap(): Promise<void> {
        // We can leave the xrp ws connected indefinitely as we are making requests every ~3 seconds, it will not timeout
        await this.xrpClient.connect();
        if (process.env.NODE_ENV !== "test" && this.configService.get<boolean>("xrp.enableIndexer")) {
            const currentLedgerIndex = await this.getCurrentLedgerIndex();
            const index = currentLedgerIndex || this.configService.get<number>("xrp.startingLedgerIndex");
            await this.indexLedger(index);
        }
    }

    /**
     * Sends a ledger to the ledger queue
     * @param index
     * @param delay
     */
    async indexLedger(index: number, delay?: number): Promise<void> {
        await this.ledgerQueue.empty();
        await this.ledgerQueue.add("index-ledger", { index }, { delay });
    }

    /**
     * Gets db current ledger index
     */
    async getCurrentLedgerIndex(): Promise<number | undefined> {
        const lastLedger = await this.lastIndexedLedgerRepository.findOne({ where: { id: 1 } });
        return lastLedger?.index;
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
     * @param transaction
     */
    async processTransactionByType(transaction: ValidatedLedgerTransaction): Promise<void> {
        if (transaction.TransactionType === "NFTokenMint") {
            const job = await this.transactionsQueue.add(
                "process-mint-transaction",
                { transaction },
                {
                    attempts: 3,
                    backoff: 60000,
                },
            );
            await job.finished();
        }
    }
}

import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { LastIndexedLedger } from "../../database/entities/LastIndexedLedger";
import { Repository } from "typeorm";
import { InjectQueue } from "@nestjs/bull";
import { Queue } from "bull";
import { Client } from "xrpl";
import { ConfigService } from "@nestjs/config";
import { LedgerResponse } from "xrpl/dist/npm/models/methods";

/**
 * Service in charge of all blockchain related stuff
 */
@Injectable()
export class BlockchainService {
    private readonly xrpClient: Client;

    constructor(
        @InjectRepository(LastIndexedLedger) private readonly lastIndexedLedgerRepository: Repository<LastIndexedLedger>,
        @InjectQueue("ledger") private readonly ledgerQueue: Queue,
        private readonly configService: ConfigService,
    ) {
        const xrpNode = this.configService.get<string>("xrp.node");
        this.xrpClient = new Client(xrpNode);
    }

    async onApplicationBootstrap(): Promise<void> {
        await this.ledgerQueue.empty();
        // We can leave the xrp ws connected indefinitely as we are making requests every ~3 seconds, it will not timeout
        await this.xrpClient.connect();
        const index = (await this.getCurrentLedgerIndex()) || this.configService.get<number>("xrp.startingLedgerIndex");
        await this.indexLedger(index);
    }

    async indexLedger(index: number, delay?: number): Promise<void> {
        await this.ledgerQueue.empty();
        await this.ledgerQueue.add("index-ledger", { index }, { delay });
    }

    async getCurrentLedgerIndex(): Promise<number | undefined> {
        const lastLedger = await this.lastIndexedLedgerRepository.findOne(1);
        return lastLedger?.index;
    }

    async setCurrentLedgerIndex(index: number): Promise<number> {
        const lastLedger = await this.lastIndexedLedgerRepository.save({ id: 1, index });
        return lastLedger.index;
    }

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
}

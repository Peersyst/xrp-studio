import { LedgerConsumer } from "../../../../src/modules/blockchain/queue/ledger.consumer";
import { Test } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { LastIndexedLedger } from "../../../../src/database/entities/LastIndexedLedger";
import { ConfigService } from "@nestjs/config";
import ConfigServiceMock from "../../__mock__/config.service.mock";
import { BlockchainService } from "../../../../src/modules/blockchain/blockchain.service";
import BlockchainServiceMock from "../../__mock__/blockchain.service.mock";
import { Job } from "bull";
import LoggerMock from "../../__mock__/logger.mock";
import LedgerMock from "../../__mock__/ledger.mock";
import TransactionsConsumerMock from "../../__mock__/transactions.consumer.mock";
import LastIndexedLedgerRepositoryMock from "../../__mock__/last-indexed-ledger.repository.mock";

describe("LedgerConsumer", () => {
    let ledgerConsumer: LedgerConsumer;
    const configServiceMock = new ConfigServiceMock();
    const loggerMock = new LoggerMock();
    const transactionsConsumerMock = new TransactionsConsumerMock();
    const blockchainServiceMock = new BlockchainServiceMock();
    const lastIndexedLedgerRepositoryMock = new LastIndexedLedgerRepositoryMock();

    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [
                {
                    provide: getRepositoryToken(LastIndexedLedger),
                    useValue: lastIndexedLedgerRepositoryMock,
                },
                {
                    provide: BlockchainService,
                    useValue: blockchainServiceMock,
                },
                {
                    provide: ConfigService,
                    useValue: configServiceMock,
                },
                {
                    provide: "BullQueue_transactions",
                    useValue: transactionsConsumerMock,
                },
                LedgerConsumer,
            ],
        }).compile();
        ledgerConsumer = module.get(LedgerConsumer);
        lastIndexedLedgerRepositoryMock.clear();
        loggerMock.clear();
        blockchainServiceMock.clear();
        configServiceMock.clear();
    });

    test("Indexes a validated ledger", async () => {
        await ledgerConsumer.indexLedger({ data: { index: 1 } } as Job);

        expect(blockchainServiceMock.getLedger).toHaveBeenCalledTimes(1);
        expect(loggerMock.log).toHaveBeenCalledWith("INDEXED LEDGER 1");
        expect(blockchainServiceMock.setLedgerAsValidated).toHaveBeenCalledWith(1);
    });

    test("Does not index a non validated ledger", async () => {
        blockchainServiceMock.getLedger.mockReturnValueOnce(new Promise((resolve) => resolve({ ...LedgerMock, validated: false })));

        await ledgerConsumer.indexLedger({ data: { index: 1 } } as Job);

        expect(blockchainServiceMock.getLedger).toHaveBeenCalledTimes(1);
        expect(blockchainServiceMock.resumeTransactionQueues).toHaveBeenCalledTimes(1);
        expect(loggerMock.log).toHaveBeenCalledWith("LEDGER INDEX 1 NOT VALIDATED YET");
        expect(blockchainServiceMock.indexLedger).toHaveBeenCalledWith(1, 3000);
    });

    test("Does not find the ledger with the index given", async () => {
        blockchainServiceMock.getLedger.mockReturnValueOnce(new Promise((_, reject) => reject({ data: { error_code: 21 } })));

        await ledgerConsumer.indexLedger({ data: { index: 1 } } as Job);

        expect(blockchainServiceMock.getLedger).toHaveBeenCalledTimes(1);
        expect(loggerMock.log).toHaveBeenCalledWith("LEDGER INDEX 1 NOT FOUND");
        expect(blockchainServiceMock.indexLedger).toHaveBeenCalledWith(1, 3000);
    });

    test("A different error occurs", async () => {
        blockchainServiceMock.getLedger.mockReturnValueOnce(new Promise((_, reject) => reject({ data: { error_code: 0 } })));

        await ledgerConsumer.indexLedger({ data: { index: 1 } } as Job);

        expect(blockchainServiceMock.getLedger).toHaveBeenCalledTimes(1);
        expect(loggerMock.error).toHaveBeenCalledTimes(1);
        expect(blockchainServiceMock.indexLedger).toHaveBeenCalledWith(1, 3000);
    });
});

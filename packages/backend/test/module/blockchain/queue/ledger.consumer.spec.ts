import { LedgerConsumer } from "../../../../src/modules/blockchain/queue/ledger.consumer";
import { Test } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { LastIndexedLedger } from "../../../../src/database/entities/LastIndexedLedger";
import LastIndexedLedgerMock from "../../__mock__/last-indexed-ledger.mock";
import { ConfigService } from "@nestjs/config";
import ConfigServiceMock from "../../__mock__/config.service.mock";
import { BlockchainService } from "../../../../src/modules/blockchain/blockchain.service";
import { Logger } from "@nestjs/common";
import BlockchainServiceMock, { clearBlockchainServiceMock } from "../../__mock__/blockchain.service.mock";
import { Job } from "bull";
import LedgerMock from "../../__mock__/ledger.mock";

describe("LedgerConsumer", () => {
    let ledgerConsumer: LedgerConsumer;
    const LoggerMock = {
        log: jest.spyOn(Logger.prototype, "log").mockImplementation(),
        error: jest.spyOn(Logger.prototype, "error").mockImplementation(),
    };

    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [
                {
                    provide: getRepositoryToken(LastIndexedLedger),
                    useValue: LastIndexedLedgerMock,
                },
                {
                    provide: BlockchainService,
                    useValue: BlockchainServiceMock,
                },
                {
                    provide: ConfigService,
                    useValue: ConfigServiceMock,
                },
                LedgerConsumer,
            ],
        }).compile();
        ledgerConsumer = module.get(LedgerConsumer);

        Object.values(LoggerMock).forEach((mock) => mock.mockClear());
        clearBlockchainServiceMock();
    });

    test("Indexes a validated ledger", async () => {
        await ledgerConsumer.indexLedger({ data: { index: 1 } } as Job);

        expect(BlockchainServiceMock.getLedger).toHaveBeenCalledTimes(1);
        expect(LoggerMock.log).toHaveBeenCalledWith("INDEXED LEDGER 1");
        expect(BlockchainServiceMock.setCurrentLedgerIndex).toHaveBeenCalledWith(2);
        expect(BlockchainServiceMock.indexLedger).toHaveBeenCalledWith(2);
    });

    test("Does not index a non validated ledger", async () => {
        BlockchainServiceMock.getLedger.mockReturnValueOnce(new Promise((resolve) => resolve({ ...LedgerMock, validated: false })));

        await ledgerConsumer.indexLedger({ data: { index: 1 } } as Job);

        expect(BlockchainServiceMock.getLedger).toHaveBeenCalledTimes(1);
        expect(LoggerMock.log).toHaveBeenCalledWith("LEDGER INDEX 1 NOT VALIDATED YET");
        expect(BlockchainServiceMock.indexLedger).toHaveBeenCalledWith(1, 3000);
    });

    test("Does not find the ledger with the index given", async () => {
        BlockchainServiceMock.getLedger.mockReturnValueOnce(new Promise((_, reject) => reject({ data: { error_code: 21 } })));

        await ledgerConsumer.indexLedger({ data: { index: 1 } } as Job);

        expect(BlockchainServiceMock.getLedger).toHaveBeenCalledTimes(1);
        expect(LoggerMock.log).toHaveBeenCalledWith("LEDGER INDEX 1 NOT FOUND");
        expect(BlockchainServiceMock.indexLedger).toHaveBeenCalledWith(1, 3000);
    });

    test("A different error occurs", async () => {
        BlockchainServiceMock.getLedger.mockReturnValueOnce(new Promise((_, reject) => reject({ data: { error_code: 0 } })));

        await ledgerConsumer.indexLedger({ data: { index: 1 } } as Job);

        expect(BlockchainServiceMock.getLedger).toHaveBeenCalledTimes(1);
        expect(LoggerMock.error).toHaveBeenCalledTimes(1);
        expect(BlockchainServiceMock.indexLedger).toHaveBeenCalledWith(1, 3000);
    });
});

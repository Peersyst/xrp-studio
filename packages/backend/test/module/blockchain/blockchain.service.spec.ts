import { BlockchainService } from "../../../src/modules/blockchain/blockchain.service";
import { Test } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { LastIndexedLedger } from "../../../src/database/entities/LastIndexedLedger";
import LastIndexedLedgerMock, { LastIndexedLedgerMockEntity } from "../__mock__/last-indexed-ledger.mock";
import LedgerConsumerMock from "../__mock__/ledger.consumer.mock";
import ConfigServiceMock from "../__mock__/config.service.mock";
import { ConfigService } from "@nestjs/config";
import { Client } from "xrpl";
import LedgerMock from "../__mock__/ledger.mock";

describe("BlockchainService", () => {
    let blockchainService: BlockchainService;
    const XrpClientMock = {
        connect: jest.spyOn(Client.prototype, "connect").mockImplementation(),
        request: jest.spyOn(Client.prototype, "request").mockImplementation(),
    };

    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [
                {
                    provide: getRepositoryToken(LastIndexedLedger),
                    useValue: LastIndexedLedgerMock,
                },
                {
                    provide: "BullQueue_ledger",
                    useValue: LedgerConsumerMock,
                },
                {
                    provide: ConfigService,
                    useValue: ConfigServiceMock,
                },
                BlockchainService,
            ],
        }).compile();
        blockchainService = module.get(BlockchainService);
        LedgerConsumerMock.empty.mockClear();
        LedgerConsumerMock.add.mockClear();
        ConfigServiceMock.get.mockClear();
        Object.values(XrpClientMock).forEach((mock) => mock.mockClear());
    });

    describe("onApplicationBootstrap", () => {
        const indexLedgerMock = jest.spyOn(BlockchainService.prototype, "indexLedger").mockImplementation();
        const getCurrentLedgerIndexMock = jest
            .spyOn(BlockchainService.prototype, "getCurrentLedgerIndex")
            .mockReturnValue(new Promise((resolve) => resolve(5)));

        beforeEach(() => {
            indexLedgerMock.mockClear();
            getCurrentLedgerIndexMock.mockClear();
        });
        afterAll(() => {
            indexLedgerMock.mockRestore();
            getCurrentLedgerIndexMock.mockRestore();
        });

        test("Should empty ledger queue and connect to the xrp client", async () => {
            await blockchainService.onApplicationBootstrap();
            expect(LedgerConsumerMock.empty).toHaveBeenCalled();
            expect(XrpClientMock.connect).toHaveBeenCalled();
        });
        test("Should get current index from db", async () => {
            await blockchainService.onApplicationBootstrap();
            expect(getCurrentLedgerIndexMock).toHaveBeenCalledTimes(1);
            expect(indexLedgerMock).toHaveBeenCalledWith(5);
        });
        test("Should get current index from db", async () => {
            getCurrentLedgerIndexMock.mockReturnValue(new Promise((resolve) => resolve(undefined)));
            await blockchainService.onApplicationBootstrap();
            expect(getCurrentLedgerIndexMock).toHaveBeenCalledTimes(1);
            expect(indexLedgerMock).toHaveBeenCalledWith(ConfigServiceMock.get("xrp.startingLedgerIndex"));
        });
    });

    describe("indexLedger", () => {
        test("Should empty ledger queue and and a new index", async () => {
            await blockchainService.indexLedger(1);
            expect(LedgerConsumerMock.empty).toHaveBeenCalledTimes(1);
            expect(LedgerConsumerMock.add).toHaveBeenCalledWith("index-ledger", { index: 1 }, { delay: undefined });
        });
    });

    describe("getCurrentLedgerIndex", () => {
        test("Should return stored index", async () => {
            const index = await blockchainService.getCurrentLedgerIndex();
            expect(index).toEqual(LastIndexedLedgerMockEntity.index);
        });
        test("Should return undefined if an index is not stored", async () => {
            LastIndexedLedgerMock.findOne.mockReturnValueOnce(new Promise((resolve) => resolve(undefined)) as any);
            const index = await blockchainService.getCurrentLedgerIndex();
            expect(index).not.toBeDefined();
        });
    });

    describe("setCurrentLedgerIndex", () => {
        test("Stores given index and returns it", async () => {
            const index = await blockchainService.setCurrentLedgerIndex(25);
            expect(LastIndexedLedgerMock.save).toHaveBeenCalledWith({ id: 1, index: 25 });
            expect(index).toEqual(25);
        });
    });

    describe("getLedger", () => {
        test("Returns a ledger", async () => {
            XrpClientMock.request.mockReturnValueOnce(
                new Promise((resolve) => resolve({ result: { ledger: LedgerMock, validated: true } } as any)),
            );
            const ledger = await blockchainService.getLedger(1);
            expect(ledger).toEqual({ ...LedgerMock, validated: true });
        });
    });
});

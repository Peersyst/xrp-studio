import { BlockchainService } from "../../../src/modules/blockchain/blockchain.service";
import { Test } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { LastIndexedLedger } from "../../../src/database/entities/LastIndexedLedger";
import LedgerConsumerMock from "../__mock__/ledger.consumer.mock";
import ConfigServiceMock from "../__mock__/config.service.mock";
import { ConfigService } from "@nestjs/config";
import LedgerMock from "../__mock__/ledger.mock";
import TransactionsConsumerMock from "../__mock__/transactions.consumer.mock";
import NFTokenMintTransactionMock from "../__mock__/nftokenmint-transaction.mock";
import XrplClientMock from "../__mock__/xrpl-client.mock";
import PaymentTransactionMock from "../__mock__/payment-transaction.mock";
import LastIndexedLedgerRepositoryMock, { LastIndexedLedgerMockEntity } from "../__mock__/last-indexed-ledger.repository.mock";

describe("BlockchainService", () => {
    let blockchainService: BlockchainService;
    const xrpClientMock = new XrplClientMock();
    const ledgerConsumerMock = new LedgerConsumerMock();
    const transactionsConsumerMock = new TransactionsConsumerMock();
    const configServiceMock = new ConfigServiceMock();
    const lastIndexedLedgerRepositoryMock = new LastIndexedLedgerRepositoryMock();

    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [
                {
                    provide: getRepositoryToken(LastIndexedLedger),
                    useValue: lastIndexedLedgerRepositoryMock,
                },
                {
                    provide: "BullQueue_ledger",
                    useValue: ledgerConsumerMock,
                },
                {
                    provide: "BullQueue_transactions",
                    useValue: transactionsConsumerMock,
                },
                {
                    provide: ConfigService,
                    useValue: configServiceMock,
                },
                BlockchainService,
            ],
        }).compile();
        blockchainService = module.get(BlockchainService);
        ledgerConsumerMock.clear();
        transactionsConsumerMock.clear();
        configServiceMock.clear();
        Object.values(xrpClientMock).forEach((mock) => mock.mockClear());
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
            expect(xrpClientMock.connect).toHaveBeenCalled();
        });
        test("Should get current index from db", async () => {
            await blockchainService.onApplicationBootstrap();
            expect(getCurrentLedgerIndexMock).toHaveBeenCalledTimes(1);
            expect(indexLedgerMock).toHaveBeenCalledWith(5);
        });
        test("Should get current index from config", async () => {
            getCurrentLedgerIndexMock.mockReturnValue(new Promise((resolve) => resolve(undefined)));
            xrpClientMock.request.mockReturnValueOnce(
                new Promise((resolve) => resolve({ result: { info: { complete_ledgers: "1-2,4-5" } } } as any)),
            );
            await blockchainService.onApplicationBootstrap();
            expect(getCurrentLedgerIndexMock).toHaveBeenCalledTimes(1);
            expect(indexLedgerMock).toHaveBeenCalledWith(configServiceMock.get("xrp.startingLedgerIndex"));
        });
        test("Should get current index from chain", async () => {
            getCurrentLedgerIndexMock.mockReturnValue(new Promise((resolve) => resolve(undefined)));
            xrpClientMock.request.mockReturnValueOnce(
                new Promise((resolve) => resolve({ result: { info: { complete_ledgers: "1-2,11-15" } } } as any)),
            );
            await blockchainService.onApplicationBootstrap();
            expect(getCurrentLedgerIndexMock).toHaveBeenCalledTimes(1);
            expect(indexLedgerMock).toHaveBeenCalledWith(11);
        });
    });

    describe("indexLedger", () => {
        test("Should empty ledger queue and and a new index", async () => {
            await blockchainService.indexLedger(1);
            expect(ledgerConsumerMock.empty).toHaveBeenCalledTimes(1);
            expect(ledgerConsumerMock.add).toHaveBeenCalledWith("index-ledger", { index: 1 }, { delay: undefined });
        });
    });

    describe("getCurrentLedgerIndex", () => {
        test("Should return stored index", async () => {
            const index = await blockchainService.getCurrentLedgerIndex();
            expect(index).toEqual(LastIndexedLedgerMockEntity.index);
        });
        test("Should return undefined if an index is not stored", async () => {
            lastIndexedLedgerRepositoryMock.findOne.mockReturnValueOnce(new Promise((resolve) => resolve(undefined)) as any);
            const index = await blockchainService.getCurrentLedgerIndex();
            expect(index).not.toBeDefined();
        });
    });

    describe("setCurrentLedgerIndex", () => {
        test("Stores given index and returns it", async () => {
            const index = await blockchainService.setCurrentLedgerIndex(25);
            expect(lastIndexedLedgerRepositoryMock.save).toHaveBeenCalledWith({ id: 1, index: 25 });
            expect(index).toEqual(25);
        });
    });

    describe("getLedger", () => {
        test("Returns a ledger", async () => {
            xrpClientMock.request.mockReturnValueOnce(
                new Promise((resolve) => resolve({ result: { ledger: LedgerMock, validated: true } } as any)),
            );
            const ledger = await blockchainService.getLedger(1);
            expect(ledger).toEqual({ ...LedgerMock, validated: true });
        });
    });

    describe("processTransactionByType", () => {
        test("Sends NFTokenMint transaction to process-mint-transaction queue", async () => {
            const nftMintTransaction = new NFTokenMintTransactionMock();
            await blockchainService.processTransactionByType(nftMintTransaction, 1);
            expect(transactionsConsumerMock.add).toHaveBeenCalledWith(
                "process-mint-transaction",
                { transaction: nftMintTransaction, ledgerIndex: 1 },
                expect.any(Object),
            );
        });
        test("Does nothing if transaction is not of type NFTokenMint", async () => {
            const transaction = new PaymentTransactionMock();
            await blockchainService.processTransactionByType(transaction, 1);
            expect(transactionsConsumerMock.add).not.toHaveBeenCalled();
        });
    });
});

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
import LastIndexedLedgerRepositoryMock from "../__mock__/last-indexed-ledger.repository.mock";
import DropConsumerMock from "../__mock__/drop.consumer.mock";
import { OfferService } from "../../../src/modules/offer/offer.service";
import OfferServiceMock from "../__mock__/offer.service.mock";
import OfferConsumerMock from "../__mock__/offer.consumer.mock";

describe("BlockchainService", () => {
    let blockchainService: BlockchainService;
    const xrpClientMock = new XrplClientMock();
    const ledgerConsumerMock = new LedgerConsumerMock();
    const transactionsConsumerMock = new TransactionsConsumerMock();
    const dropConsumerMock = new DropConsumerMock();
    const offerConsumerMock = new OfferConsumerMock();
    const configServiceMock = new ConfigServiceMock();
    const offerServiceMock = new OfferServiceMock();
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
                    provide: "BullQueue_drop",
                    useValue: dropConsumerMock,
                },
                {
                    provide: "BullQueue_offer",
                    useValue: offerConsumerMock,
                },
                {
                    provide: ConfigService,
                    useValue: configServiceMock,
                },
                {
                    provide: OfferService,
                    useValue: offerServiceMock,
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

    describe("indexPendingLedgers", () => {
        test("Should queue all ledgers", async () => {
            await blockchainService.indexPendingLedgers([1, 3]);
            expect(ledgerConsumerMock.add).toHaveBeenCalledWith("index-ledger", { index: 1 }, { delay: undefined, priority: 1 });
            expect(ledgerConsumerMock.add).toHaveBeenCalledWith("index-ledger", { index: 3 }, { delay: undefined, priority: 3 });
        });
    });

    describe("indexLedger", () => {
        test("Should empty ledger queue and and a new index", async () => {
            await blockchainService.indexLedger(1);
            expect(ledgerConsumerMock.add).toHaveBeenCalledWith("index-ledger", { index: 1 }, { delay: undefined, priority: 1 });
        });
    });

    describe("setCurrentLedgerIndex", () => {
        test("Stores given index and returns it", async () => {
            await blockchainService.setLedgerAsValidated(25);
            expect(lastIndexedLedgerRepositoryMock.save).toHaveBeenCalledWith({ ledger: 25 });
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
                { transaction: nftMintTransaction },
                expect.any(Object),
            );
        });
        test("Does nothing if transaction is not of type NFTokenMint", async () => {
            const transaction = new PaymentTransactionMock();
            transaction.metaData = { ...transaction.metaData, TransactionResult: "tesSUCCESS" };
            await blockchainService.processTransactionByType(transaction, 1);
            expect(transactionsConsumerMock.add).not.toHaveBeenCalled();
        });
    });
});

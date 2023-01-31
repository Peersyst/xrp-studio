import { Test } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { MetadataService } from "../../../src/modules/metadata/metadata.service";
import { CollectionService } from "../../../src/modules/collection/collection.service";
import { BlockchainService } from "../../../src/modules/blockchain/blockchain.service";
import { BlockchainTransactionService } from "../../../src/modules/blockchain/blockchain-transaction.service";
import { XummTransactionService } from "../../../src/modules/xumm/xumm-transaction.service";
import { NftService } from "../../../src/modules/nft/nft.service";
import BlockchainServiceMock from "../__mock__/blockchain.service.mock";
import { DropService } from "../../../src/modules/drop/drop.service";
import BlockchainTransactionServiceMock from "../__mock__/blockchain-transaction.service.mock";
import CollectionServiceMock from "../__mock__/collection.service.mock";
import NftServiceMock from "../__mock__/nft.service.mock";
import MetadataServiceMock from "../__mock__/metadata.service.mock";
import XummTransactionServiceMock from "../__mock__/xumm-transaction.service.mock";
import ConfigServiceMock from "../__mock__/config.service.mock";
import DropConsumerMock from "../__mock__/drop.consumer.mock";
import TransactionStatusConsumerMock from "../__mock__/transaction-status.consumer.mock";
import NftInDropRepositoryMock from "../__mock__/nft-in-drop.repository.mock";
import DropRepositoryMock from "../__mock__/drop.repository.mock";
import { ConfigService } from "@nestjs/config";
import { Drop } from "../../../src/database/entities/Drop";
import { NftInDrop } from "../../../src/database/entities/NftInDrop";
import NftMock from "../__mock__/nft.mock";
import PaymentTransactionMock from "../__mock__/payment-transaction.mock";

describe("DropService", function () {
    let dropService: DropService;
    const blockchainServiceMock = new BlockchainServiceMock();
    const blockchainTransactionServiceMock = new BlockchainTransactionServiceMock();
    const collectionServiceMock = new CollectionServiceMock();
    const nftServiceMock = new NftServiceMock();
    const metadataServiceMock = new MetadataServiceMock();
    const xummTransactionServiceMock = new XummTransactionServiceMock();
    const configServiceMock = new ConfigServiceMock();
    const dropRepositoryMock = new DropRepositoryMock();
    const nftInDropRepositoryMock = new NftInDropRepositoryMock();
    const dropConsumerMock = new DropConsumerMock();
    const transactionStatusConsumerMock = new TransactionStatusConsumerMock();

    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [
                {
                    provide: BlockchainService,
                    useValue: blockchainServiceMock,
                },
                {
                    provide: BlockchainTransactionService,
                    useValue: blockchainTransactionServiceMock,
                },
                {
                    provide: CollectionService,
                    useValue: collectionServiceMock,
                },
                {
                    provide: NftService,
                    useValue: nftServiceMock,
                },
                {
                    provide: MetadataService,
                    useValue: metadataServiceMock,
                },
                {
                    provide: XummTransactionService,
                    useValue: xummTransactionServiceMock,
                },
                {
                    provide: ConfigService,
                    useValue: configServiceMock,
                },
                {
                    provide: getRepositoryToken(Drop),
                    useValue: dropRepositoryMock,
                },
                {
                    provide: getRepositoryToken(NftInDrop),
                    useValue: nftInDropRepositoryMock,
                },
                {
                    provide: "BullQueue_drop",
                    useValue: dropConsumerMock,
                },
                {
                    provide: "BullQueue_transaction-status",
                    useValue: transactionStatusConsumerMock,
                },
                DropService,
            ],
        }).compile();
        dropService = module.get(DropService);
        blockchainServiceMock.clear();
        blockchainTransactionServiceMock.clear();
        collectionServiceMock.clear();
        nftServiceMock.clear();
        metadataServiceMock.clear();
        xummTransactionServiceMock.clear();
        configServiceMock.clear();
        dropRepositoryMock.clear();
        nftInDropRepositoryMock.clear();
        dropConsumerMock.clear();
        transactionStatusConsumerMock.clear();
    });

    describe("canCollectionBecomeDrop", () => {
        test("Returns false", async () => {
            nftServiceMock.findOne.mockResolvedValueOnce(new NftMock());
            const canBecomeDrop = await dropService.canCollectionBecomeDrop(1);
            expect(canBecomeDrop).toEqual(false);
        });
        test("Returns true", async () => {
            nftServiceMock.findOne.mockRejectedValueOnce(new Error());
            const canBecomeDrop = await dropService.canCollectionBecomeDrop(1);
            expect(canBecomeDrop).toEqual(true);
        });
    });

    describe("isValidDropPayment", () => {
        describe("Returns false", () => {
            test("Tx not validated", async () => {
                const isValidDropPayment = await dropService.isValidDropPayment(
                    "owner_address",
                    1,
                    new PaymentTransactionMock({ validated: false }),
                );
                expect(isValidDropPayment).toEqual(false);
            });

            test("Not valid drop payment", async () => {
                blockchainTransactionServiceMock.isValidPaymentToMintingAccount.mockReturnValueOnce(false);
                const isValidDropPayment = await dropService.isValidDropPayment("owner_address", 1, new PaymentTransactionMock());
                expect(isValidDropPayment).toEqual(false);
            });

            test("Does not contain memos", async () => {
                const isValidDropPayment = await dropService.isValidDropPayment(
                    "owner_address",
                    1,
                    new PaymentTransactionMock({ Memos: undefined }),
                );
                expect(isValidDropPayment).toEqual(false);
            });

            test("Payment amount is a token", async () => {
                const isValidDropPayment = await dropService.isValidDropPayment(
                    "owner_address",
                    1,
                    new PaymentTransactionMock({ Memos: [], Amount: { value: "1", currency: "EUR", issuer: "issuer" } }),
                );
                expect(isValidDropPayment).toEqual(false);
            });

            test("Payment amount is lower than required", async () => {
                jest.spyOn(DropService.prototype, "calculateDropMintingPrice").mockResolvedValueOnce("2");
                const isValidDropPayment = await dropService.isValidDropPayment(
                    "owner_address",
                    1,
                    new PaymentTransactionMock({ Memos: [], Amount: "1" }),
                );
                expect(isValidDropPayment).toEqual(false);
            });

            test("Memo is invalid", async () => {
                jest.spyOn(DropService.prototype, "calculateDropMintingPrice").mockResolvedValueOnce("2");
                const isValidDropPayment = await dropService.isValidDropPayment(
                    "owner_address",
                    1,
                    new PaymentTransactionMock({
                        Memos: [
                            {
                                Memo: {
                                    MemoData: Buffer.from("2", "utf8").toString("hex"),
                                },
                            },
                        ],
                        Amount: "1",
                    }),
                );
                expect(isValidDropPayment).toEqual(false);
            });
        });
    });
});

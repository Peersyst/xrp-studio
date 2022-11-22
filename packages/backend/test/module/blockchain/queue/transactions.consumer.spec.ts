import { TransactionsConsumer } from "../../../../src/modules/blockchain/queue/transactions.consumer";
import ConfigServiceMock from "../../__mock__/config.service.mock";
import LoggerMock from "../../__mock__/logger.mock";
import BlockchainServiceMock from "../../__mock__/blockchain.service.mock";
import NftServiceMock from "../../__mock__/nft.service.mock";
import { Test } from "@nestjs/testing";
import { ConfigService } from "@nestjs/config";
import { BlockchainService } from "../../../../src/modules/blockchain/blockchain.service";
import { NftService } from "../../../../src/modules/nft/nft.service";
import PaymentTransactionMock from "../../__mock__/payment-transaction.mock";
import NFTokenMintTransactionMock from "../../__mock__/nftokenmint-transaction.mock";
import { Job } from "bull";
import NftMock from "../../__mock__/nft.mock";

describe("TransactionsConsumer", () => {
    let transactionsConsumer: TransactionsConsumer;
    const configServiceMock = new ConfigServiceMock();
    const loggerMock = new LoggerMock();
    const blockchainServiceMock = new BlockchainServiceMock();
    const nftServiceMock = new NftServiceMock();

    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [
                {
                    provide: ConfigService,
                    useValue: configServiceMock,
                },
                {
                    provide: BlockchainService,
                    useValue: blockchainServiceMock,
                },
                {
                    provide: NftService,
                    useValue: nftServiceMock,
                },
                TransactionsConsumer,
            ],
        }).compile();
        transactionsConsumer = module.get(TransactionsConsumer);
        loggerMock.clear();
        configServiceMock.clear();
        blockchainServiceMock.clear();
        nftServiceMock.clear();
    });

    describe("processTransactions", () => {
        test("Processes a group of transactions", async () => {
            await transactionsConsumer.processTransactions({
                data: { transactions: [new PaymentTransactionMock(), new NFTokenMintTransactionMock()], ledgerIndex: 1 },
            } as Job);
            expect(loggerMock.log).toHaveBeenLastCalledWith(`PROCESSING ${2} TRANSACTIONS FROM LEDGER ${1}`);
            expect(blockchainServiceMock.processTransactionByType).toHaveBeenCalledTimes(2);
        });

        test("Does nothing when ledger has no transactions", async () => {
            await transactionsConsumer.processTransactions({
                data: { transactions: [], ledgerIndex: 1 },
            } as Job);
            expect(loggerMock.log).not.toHaveBeenCalled();
            expect(blockchainServiceMock.processTransactionByType).not.toHaveBeenCalled();
        });
    });

    describe("processMintTransactions", () => {
        const nftMintTransaction = new NFTokenMintTransactionMock();

        test("Processes mint transaction correctly and creates an NFT", async () => {
            await transactionsConsumer.processMintTransaction({ data: { transaction: nftMintTransaction, ledgerIndex: 1 } } as Job);
            expect(loggerMock.log).toHaveBeenCalledWith(`PROCESSING MINT TRANSACTION ${nftMintTransaction.hash}`);
            expect(nftServiceMock.createNftFromMintTransaction).toHaveBeenLastCalledWith(nftMintTransaction, 1);
            expect(loggerMock.log).toHaveBeenCalledWith(`INDEXED NFT ${new NftMock().tokenId}`);
        });
        test("There is an error storing the NFT", async () => {
            const nft = new NftMock();
            nftServiceMock.createNftFromMintTransaction.mockImplementationOnce(() => {
                throw { error: "Error", nft };
            });
            await transactionsConsumer.processMintTransaction({ data: { transaction: nftMintTransaction } } as Job);
            expect(loggerMock.error).toHaveBeenCalledWith(`FAILED TO INDEX NFT FROM MINT TRANSACTION ${nftMintTransaction.hash}.
Error: Error
Resulting NFT: ${JSON.stringify(nft)}`);
        });
        test("There is an error unrelated to storing the NFT", async () => {
            nftServiceMock.createNftFromMintTransaction.mockImplementationOnce(() => {
                throw "Weird error";
            });
            await transactionsConsumer.processMintTransaction({ data: { transaction: nftMintTransaction } } as Job);
            expect(loggerMock.error).toHaveBeenCalledWith(`FAILED TO INDEX NFT FROM MINT TRANSACTION ${nftMintTransaction.hash}.
Error: ${JSON.stringify("Weird error")}`);
        });
    });
});

import BaseMock from "./base.mock";
import NFTokenMintTransactionMock from "./nftokenmint-transaction.mock";

class BlockchainTransactionServiceMock extends BaseMock {
    prepareNftMintTransaction = jest.fn(() => new NFTokenMintTransactionMock());
    isValidPaymentToMintingAccount = jest.fn().mockReturnValue(true);
}

export default BlockchainTransactionServiceMock;

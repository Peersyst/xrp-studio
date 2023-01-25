import LedgerMock from "./ledger.mock";
import BaseMock from "./base.mock";

export const CURRENT_LEDGER_INDEX_MOCK = 25;

class BlockchainServiceMock extends BaseMock {
    onApplicationBootstrap = jest.fn();
    indexLedger = jest.fn();
    getCurrentLedgerIndex = jest.fn(() => new Promise((resolve) => resolve(CURRENT_LEDGER_INDEX_MOCK)));
    setLedgerAsValidated = jest.fn(() => Promise.resolve());
    getLedger = jest.fn(() => new Promise((resolve) => resolve({ ...LedgerMock, validated: true })));
    processTransactionByType = jest.fn();
    resumeTransactionQueues = jest.fn();
    getMintedTokens = jest.fn();
}

export default BlockchainServiceMock;

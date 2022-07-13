import LedgerMock from "./ledger.mock";

export const CURRENT_LEDGER_INDEX_MOCK = 25;

const BlockchainServiceMock = {
    onApplicationBootstrap: jest.fn(),
    indexLedger: jest.fn(),
    getCurrentLedgerIndex: jest.fn(() => new Promise((resolve) => resolve(CURRENT_LEDGER_INDEX_MOCK))),
    setCurrentLedgerIndex: jest.fn(() => new Promise((resolve) => resolve(CURRENT_LEDGER_INDEX_MOCK))),
    getLedger: jest.fn(() => new Promise((resolve) => resolve({ ...LedgerMock, validated: true }))),
};

export const clearBlockchainServiceMock = () => {
    Object.values(BlockchainServiceMock).forEach((mock) => mock.mockClear());
};

export default BlockchainServiceMock;

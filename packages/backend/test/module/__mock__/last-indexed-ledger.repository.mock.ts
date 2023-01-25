import { LastIndexedLedger } from "../../../src/database/entities/LastIndexedLedger";
import BaseMock from "./base.mock";

export const LastIndexedLedgerMockEntity: LastIndexedLedger = {
    ledger: 1,
};

class LastIndexedLedgerRepositoryMock extends BaseMock {
    findOne = jest.fn(() => LastIndexedLedgerMockEntity);
    save = jest.fn((ledgerIndex: LastIndexedLedger) => ledgerIndex);
}

export default LastIndexedLedgerRepositoryMock;

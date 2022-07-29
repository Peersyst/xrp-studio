import { LastIndexedLedger } from "../../../src/database/entities/LastIndexedLedger";
import BaseMock from "./base.mock";

export const LastIndexedLedgerMockEntity: LastIndexedLedger = {
    id: 1,
    index: 1,
};

class LastIndexedLedgerRepositoryMock extends BaseMock {
    findOne = jest.fn(() => LastIndexedLedgerMockEntity);
    save = jest.fn((ledgerIndex: LastIndexedLedger) => ledgerIndex);
}

export default LastIndexedLedgerRepositoryMock;

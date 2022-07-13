import { LastIndexedLedger } from "../../../src/database/entities/LastIndexedLedger";

export const LastIndexedLedgerMockEntity: LastIndexedLedger = {
    id: 1,
    index: 1,
};

export default {
    findOne: jest.fn(() => LastIndexedLedgerMockEntity),
    save: jest.fn((ledgerIndex: LastIndexedLedger) => ledgerIndex),
};

import { Ledger } from "xrpl/dist/npm/models/ledger";

const LedgerMock: Ledger = {
    account_hash: "account_hash",
    close_flags: 0,
    close_time: 2,
    close_time_human: "close_time_human",
    close_time_resolution: 2,
    closed: true,
    ledger_hash: "ledger_hash",
    ledger_index: "validated",
    parent_close_time: 1,
    parent_hash: "parent_hash",
    total_coins: "123456",
    transaction_hash: "transaction_hash",
    transactions: [],
};

export default LedgerMock;

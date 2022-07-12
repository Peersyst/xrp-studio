import { Transaction } from "xrpl";
import { TransactionMetadata } from "xrpl/dist/npm/models/transactions";

export type ValidatedLedgerTransaction<T extends Transaction = Transaction> = T & { hash: string; metaData: TransactionMetadata };

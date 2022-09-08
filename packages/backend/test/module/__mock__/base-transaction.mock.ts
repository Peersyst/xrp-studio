import { Memo, Signer } from "xrpl/dist/npm/models/common";
import { BaseTransaction, GlobalFlags } from "xrpl/dist/npm/models/transactions/common";
import { TransactionMetadata } from "xrpl/dist/npm/models/transactions";
import { Transaction } from "xrpl";

export interface BaseTransactionMockOptions extends Partial<BaseTransaction & { metaData?: TransactionMetadata }> {
    validated?: boolean;
}

export type TransactionMockOptions<T extends Transaction> = Omit<BaseTransactionMockOptions & Partial<T>, "TransactionType">;

class BaseTransactionMock {
    Account: string;
    TransactionType: string;
    Fee?: string;
    Sequence?: number;
    AccountTxnID?: string;
    Flags?: number | GlobalFlags;
    LastLedgerSequence?: number;
    Memos?: Memo[];
    Signers?: Signer[];
    SourceTag?: number;
    SigningPubKey?: string;
    TicketSequence?: number;
    TxnSignature?: string;
    hash: string;
    metaData: TransactionMetadata;

    constructor({
        validated = true,
        Account,
        TransactionType,
        Fee,
        Sequence,
        AccountTxnID,
        Flags,
        LastLedgerSequence,
        Memos,
        Signers,
        SourceTag,
        SigningPubKey,
        TxnSignature,
        TicketSequence,
        metaData,
    }: BaseTransactionMockOptions = {}) {
        if (validated) {
            this.hash = "t82F9E67FE6911B79F6D52CFF810D04F1E102ADFC36A581C02CC4AC20AD651C6B";
            this.metaData = metaData;
        }

        this.Account = Account || "r95kzvuWfS71wRrge2e4roctE9UjidRB5e";
        this.TransactionType = TransactionType || "Payment";
        this.Fee = Fee;
        this.Sequence = Sequence;
        this.AccountTxnID = AccountTxnID;
        this.Flags = Flags;
        this.LastLedgerSequence = LastLedgerSequence;
        this.Memos = Memos;
        this.Signers = Signers;
        this.SourceTag = SourceTag;
        this.SigningPubKey = SigningPubKey;
        this.TxnSignature = TxnSignature;
        this.TicketSequence = TicketSequence;
    }
}

export default BaseTransactionMock;

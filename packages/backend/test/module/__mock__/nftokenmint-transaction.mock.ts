import { NFTokenMint, NFTokenMintFlagsInterface } from "xrpl/dist/npm/models/transactions/NFTokenMint";
import BaseTransactionMock, { TransactionMockOptions } from "./base-transaction.mock";

export type NFTokenMintTransactionMockOptions = TransactionMockOptions<NFTokenMint>;

class NFTokenMintTransactionMock extends BaseTransactionMock {
    TransactionType: "NFTokenMint";
    NFTokenTaxon: number;
    Issuer?: string;
    TransferFee?: number;
    URI: string;
    Flags?: number | NFTokenMintFlagsInterface;

    constructor({ NFTokenTaxon = 0, Issuer, TransferFee, URI, Flags, Memos, ...rest }: NFTokenMintTransactionMockOptions = {}) {
        super(rest);
        this.TransactionType = "NFTokenMint";
        this.NFTokenTaxon = NFTokenTaxon;
        this.Issuer = Issuer;
        this.TransferFee = TransferFee;
        this.URI = URI;
        this.Flags = Flags;
        this.Memos = Memos;
    }
}

export default NFTokenMintTransactionMock;

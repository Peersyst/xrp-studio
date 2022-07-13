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

    constructor({ NFTokenTaxon, Issuer, TransferFee, URI, Flags, ...rest }: NFTokenMintTransactionMockOptions = {}) {
        super(rest);
        this.TransactionType = "NFTokenMint";
        this.NFTokenTaxon = NFTokenTaxon;
        this.Issuer = Issuer;
        this.TransferFee = TransferFee;
        this.URI = URI || "596F75206D757374206265207265616C6C7920626F72656420746F206465636F64652074686973203A29";
        this.Flags = Flags;
    }
}

export default NFTokenMintTransactionMock;

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
        this.URI = URI;
        this.Flags = Flags;
    }
}

export default NFTokenMintTransactionMock;

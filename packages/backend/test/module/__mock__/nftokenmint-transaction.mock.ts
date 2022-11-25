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
        this.metaData = {
            TransactionIndex: 0,
            TransactionResult: "tesSUCCESS",
            AffectedNodes: [
                {
                    ModifiedNode: {
                        FinalFields: {
                            Account: "rwEiU5xL5GJUzX1cd7cvaHtf27CS2DYTGf",
                            Balance: "402938194",
                            Flags: 0,
                            MintedNFTokens: 5440,
                            NFTokenMinter: "r9t7C1dKTQQgexHohiyZXnT6q4akAbihbu",
                            OwnerCount: 2,
                            Sequence: 27538774,
                        },
                        LedgerEntryType: "AccountRoot",
                        LedgerIndex: "3DAF8C27698D510EC5A6FBCF66F41447B79131D23657357587A4F44BF8CFEE51",
                        PreviousFields: {
                            MintedNFTokens: 5439,
                        },
                        PreviousTxnID: "710DDA4C562F024B4755D13D91E839B0FB90AD3AE9EE2244D7A17BC5AC0626DA",
                    },
                },
                {
                    ModifiedNode: {
                        FinalFields: {
                            Account: "r9t7C1dKTQQgexHohiyZXnT6q4akAbihbu",
                            Balance: "999999988",
                            Flags: 0,
                            OwnerCount: 1,
                            Sequence: 33135514,
                        },
                        LedgerEntryType: "AccountRoot",
                        LedgerIndex: "516B75F385235B0581B1904E2EE546A4D84BE9A405FE78DB0202F8B67378561E",
                        PreviousFields: {
                            Balance: "1000000000",
                            OwnerCount: 0,
                            Sequence: 33135513,
                        },
                        PreviousTxnID: "F403DB88BE749FBCB0BD440020296A00D2C2AC1CFBB4785E3B4BFE084DD3022F",
                    },
                },
                {
                    CreatedNode: {
                        LedgerEntryType: "NFTokenPage",
                        LedgerIndex: "617D517973578B08A4EF6EBFE43185724B893256FFFFFFFFFFFFFFFFFFFFFFFF",
                        NewFields: {
                            NFTokens: [
                                {
                                    NFToken: {
                                        NFTokenID: "0008000A65880702C56031DC90384A905E59F581F8D825677CB38DD00000153F",
                                        URI: "697066733A2F2F516D577743597378315858587645784739736244574734434C464872696264386164614E76376459633743363174",
                                    },
                                },
                            ],
                        },
                    },
                },
            ],
        };
    }
}

export default NFTokenMintTransactionMock;

import { Injectable } from "@nestjs/common";
import { AccountSetAsfFlags, Client, convertStringToHex, SubmitResponse, Transaction, Wallet } from "xrpl";
import { ConfigService } from "@nestjs/config";
import { NFTokenMint } from "xrpl/dist/npm/models/transactions/NFTokenMint";
import { TransactionMetadata } from "xrpl/dist/npm/models/transactions";

export enum TransactionStatus {
    UNCONFIRMED = "unconfirmed",
    CONFIRMED = "confirmed",
    FAILED = "failed",
}

/**
 * Service in charge of all blockchain related stuff
 */
@Injectable()
export class BlockchainTransactionService {
    private readonly xrpClient: Client;
    private readonly mintingAccount: Wallet;

    private minterSequence: number;

    constructor(private readonly configService: ConfigService) {
        const xrpNode = this.configService.get<string>("xrp.node");
        this.xrpClient = new Client(xrpNode);
        this.mintingAccount = Wallet.fromSecret(this.configService.get("xrp.minterSecret"));
    }

    async onApplicationBootstrap(): Promise<void> {
        await this.xrpClient.connect();
        const res = await this.xrpClient.request({
            command: "account_info",
            account: this.mintingAccount.address,
        });
        this.minterSequence = res.result.account_data.Sequence;
    }

    consumeSequence(): number {
        const sequence = Number(this.minterSequence);
        this.minterSequence++;
        return sequence;
    }

    async prepareNftMintTransaction({
        account,
        flags = 0,
        memo,
        taxon = 0,
        uri,
        issuer,
        transferFee,
    }: {
        account: string;
        flags?: number;
        memo?: string;
        taxon?: number;
        uri?: string;
        issuer?: string;
        transferFee?: number;
    }): Promise<NFTokenMint> {
        return this.xrpClient.autofill({
            TransactionType: "NFTokenMint",
            Account: account,
            NFTokenTaxon: taxon,
            Flags: flags,
            Issuer: issuer,
            TransferFee: transferFee,
            URI: uri && convertStringToHex(uri),
            Sequence: account === this.mintingAccount.address ? this.consumeSequence() : undefined,
            Memos: [
                {
                    Memo: {
                        MemoData: Buffer.from(memo, "utf8").toString("hex"),
                    },
                },
            ],
        });
    }

    async prepareSellOfferTransaction({
        account,
        tokenId,
        price,
    }: {
        account: string;
        tokenId: string;
        price: string;
    }): Promise<Transaction> {
        return this.xrpClient.autofill({
            TransactionType: "NFTokenCreateOffer",
            Sequence: account === this.mintingAccount.address ? this.consumeSequence() : undefined,
            Account: account,
            NFTokenID: tokenId,
            Amount: price,
            Flags: 1,
        });
    }

    prepareAuthorizeMinterTransaction(account: string): Transaction {
        return {
            TransactionType: "AccountSet",
            Account: account,
            NFTokenMinter: this.mintingAccount.address,
            SetFlag: AccountSetAsfFlags.asfAuthorizedNFTokenMinter,
        };
    }

    prepareAcceptOfferTransaction(account: string, offerId: string): Transaction {
        return {
            TransactionType: "NFTokenAcceptOffer",
            Account: account,
            NFTokenSellOffer: offerId,
        };
    }

    preparePaymentTransaction({
        account,
        destination,
        amount,
        memo,
    }: {
        account: string;
        destination: string;
        amount: string;
        memo: string;
    }): Promise<Transaction> {
        return this.xrpClient.autofill({
            TransactionType: "Payment",
            Account: account,
            Destination: destination,
            Sequence: account === this.mintingAccount.address ? this.consumeSequence() : undefined,
            Amount: amount,
            Memos: [
                {
                    Memo: {
                        MemoData: Buffer.from(memo, "utf8").toString("hex"),
                    },
                },
            ],
        });
    }

    signTransactionWithMintingAccount(transaction: Transaction): {
        tx_blob: string;
        hash: string;
    } {
        return this.mintingAccount.sign(transaction);
    }

    async broadcastTransaction(blob: string): Promise<SubmitResponse> {
        return this.xrpClient.submit(blob);
    }

    async getTransactionStatus(hash: string): Promise<{
        status: TransactionStatus;
        error?: string;
    }> {
        const tx = await this.xrpClient.request({
            command: "tx",
            transaction: hash,
            binary: false,
        });
        if (tx.result.validated) {
            if ((tx.result.meta as TransactionMetadata)?.TransactionResult === "tesSUCCESS") {
                return { status: TransactionStatus.CONFIRMED };
            } else {
                return { status: TransactionStatus.FAILED, error: (tx.result.meta as TransactionMetadata)?.TransactionResult };
            }
        } else {
            return { status: TransactionStatus.UNCONFIRMED };
        }
    }

    async getOfferIndexFromTransaction(hash: string): Promise<string | undefined> {
        const tx = await this.xrpClient.request({
            command: "tx",
            transaction: hash,
            binary: false,
        });
        // This function is extracted from the explorer and doesn't respect current sdk version types
        return (tx.result.meta as any)?.AffectedNodes.find((node: any) => node?.CreatedNode?.LedgerEntryType === "NFTokenOffer")
            ?.CreatedNode?.LedgerIndex;
    }

    async isNftOfferFilled(nftTokenId: string, offerId: string): Promise<boolean> {
        try {
            const res = await this.xrpClient.request({
                command: "nft_sell_offers",
                nft_id: nftTokenId,
                ledger_index: "validated",
            });

            return !res.result.offers.some((offer) => {
                return offer.nft_offer_index === offerId;
            });
        } catch (e) {
            return e?.data?.error === "objectNotFound";
        }
    }
}

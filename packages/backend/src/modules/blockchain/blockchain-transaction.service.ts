import { Injectable, Logger } from "@nestjs/common";
import { AccountSetAsfFlags, Client, convertStringToHex, isoTimeToRippleTime, SubmitResponse, Transaction, Wallet } from "xrpl";
import { ConfigService } from "@nestjs/config";
import { NFTokenMint } from "xrpl/dist/npm/models/transactions/NFTokenMint";
import { TransactionMetadata } from "xrpl/dist/npm/models/transactions";
import parseFlags from "../nft/util/parseFlags";
import { TxResponse } from "xrpl/dist/npm/models/methods/tx";

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

    isoToXRPLTime(utc: string | Date): number {
        return isoTimeToRippleTime(utc);
    }

    async onApplicationBootstrap(): Promise<void> {
        await this.xrpClient.connect();
        try {
            const res = await this.xrpClient.request({
                command: "account_info",
                account: this.mintingAccount.address,
            });
            this.minterSequence = res.result.account_data.Sequence;
        } catch (e) {
            Logger.warn("Error fetching minting address sequence " + e);
            this.minterSequence = 0;
        }
    }

    consumeSequence(): number {
        const sequence = Number(this.minterSequence);
        this.minterSequence++;
        return sequence;
    }

    async prepareNftMintTransaction(
        {
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
        },
        autofill = true,
    ): Promise<NFTokenMint> {
        const tx = {
            TransactionType: "NFTokenMint",
            Account: account,
            NFTokenTaxon: taxon,
            Flags: flags,
            Issuer: issuer,
            URI: uri && convertStringToHex(uri),
            Sequence: account === this.mintingAccount.address ? this.consumeSequence() : undefined,
            Memos: [
                {
                    Memo: {
                        MemoData: Buffer.from(memo, "utf8").toString("hex"),
                    },
                },
            ],
        } as NFTokenMint;
        const { transferable } = parseFlags(flags);
        if (transferable) tx.TransferFee = transferFee || 0;
        return autofill ? this.xrpClient.autofill(tx) : tx;
    }

    async prepareOfferTransaction({
        account,
        tokenId,
        price,
        type,
        destination,
        owner,
        expiration,
    }: {
        account: string;
        destination?: string;
        owner?: string;
        tokenId: string;
        price: string;
        type: "sell" | "buy";
        expiration?: number /* expiration in UTC time */;
    }): Promise<Transaction> {
        return this.xrpClient.autofill({
            TransactionType: "NFTokenCreateOffer",
            Account: account,
            NFTokenID: tokenId,
            Destination: destination,
            Amount: price,
            Owner: type === "buy" ? owner : undefined,
            Flags: type === "sell" ? 1 : 0,
            ...(account === this.mintingAccount.address && { Sequence: this.consumeSequence() }),
            ...(expiration && { Expiration: this.isoToXRPLTime(String(expiration)) }),
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

    preparePaymentToMintingAccount({ account, amount, memo }: { account: string; amount: string; memo: string }): Promise<Transaction> {
        return this.preparePaymentTransaction({ account, destination: this.mintingAccount.address, amount, memo });
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

    async getTransaction(hash: string): Promise<TxResponse["result"] | undefined> {
        try {
            const tx = await this.xrpClient.request({
                command: "tx",
                transaction: hash,
                binary: false,
            });
            return tx.result;
        } catch (e) {
            return undefined;
        }
    }

    async getTransactionStatus(hash: string): Promise<{
        status: TransactionStatus;
        error?: string;
    }> {
        const tx = await this.getTransaction(hash);
        if (tx?.validated) {
            if ((tx.meta as TransactionMetadata)?.TransactionResult === "tesSUCCESS") {
                return { status: TransactionStatus.CONFIRMED };
            } else {
                return { status: TransactionStatus.FAILED, error: (tx.meta as TransactionMetadata)?.TransactionResult };
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

    isValidPaymentToMintingAccount(tx: Transaction, account: string): boolean {
        return tx.TransactionType === "Payment" && tx.Account === account && tx.Destination === this.mintingAccount.address;
    }
}

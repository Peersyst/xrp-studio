import { Process, Processor } from "@nestjs/bull";
import { Logger } from "@nestjs/common";
import { BlockchainService } from "../blockchain.service";
import { Job } from "bull";
import { NFTokenMint } from "xrpl/dist/npm/models/transactions/NFTokenMint";
import { ValidatedLedgerTransaction } from "../types";
import { NftService } from "../../nft/nft.service";
import { Nft } from "../../../database/entities/Nft";

@Processor("transactions")
export class TransactionsConsumer {
    private readonly logger = new Logger(TransactionsConsumer.name);

    constructor(private readonly blockchainService: BlockchainService, private readonly nftService: NftService) {}

    /**
     * Processes transactions from a ledger
     * @param transactions
     * @param ledgerIndex
     */
    @Process("process-transactions")
    async processTransactions({
        data: { transactions, ledgerIndex },
    }: Job<{ transactions: ValidatedLedgerTransaction[]; ledgerIndex: number }>) {
        if (transactions.length) {
            this.logger.log(`PROCESSING ${transactions.length} TRANSACTIONS FROM LEDGER ${ledgerIndex}`);
            for await (const tx of transactions) await this.blockchainService.processTransactionByType(tx);
        }
    }

    /**
     * Processes a mint transaction, creating an Nft entity
     * @param transaction
     */
    @Process("process-mint-transaction")
    async processMintTransaction({
        data: { transaction },
    }: Job<{
        transaction: ValidatedLedgerTransaction<NFTokenMint>;
    }>) {
        this.logger.log(`PROCESSING MINT TRANSACTION ${transaction.hash}`);
        try {
            const nft = await this.nftService.createNftFromMintTransaction(transaction);
            this.logger.log(`INDEXED NFT ${nft.tokenId}`);
        } catch (e) {
            const nftError = e as { error: any; nft: Nft };
            if ("nft" in e) {
                this.logger.error(`FAILED TO INDEX NFT FROM MINT TRANSACTION ${transaction.hash}.
Error: ${nftError.error}
Resulting NFT: ${JSON.stringify(nftError.nft)}`);
            } else {
                this.logger.error(`FAILED TO INDEX NFT FROM MINT TRANSACTION ${transaction.hash}.
Error: ${nftError.error}`);
            }
        }
    }
}

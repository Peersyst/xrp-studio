import { Injectable } from "@nestjs/common";
import { Client, convertStringToHex } from "xrpl";
import { ConfigService } from "@nestjs/config";
import { NFTokenMint } from "xrpl/dist/npm/models/transactions/NFTokenMint";

/**
 * Service in charge of all blockchain related stuff
 */
@Injectable()
export class BlockchainTransactionService {
    private readonly xrpClient: Client;

    constructor(private readonly configService: ConfigService) {
        const xrpNode = this.configService.get<string>("xrp.node");
        this.xrpClient = new Client(xrpNode);
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
        return {
            TransactionType: "NFTokenMint",
            Account: account,
            NFTokenTaxon: taxon,
            Flags: flags,
            Issuer: issuer,
            TransferFee: transferFee,
            URI: uri && convertStringToHex(uri),
            Memos: [
                {
                    Memo: {
                        MemoData: Buffer.from(memo, "utf8").toString("hex"),
                    },
                },
            ],
        };
    }
}

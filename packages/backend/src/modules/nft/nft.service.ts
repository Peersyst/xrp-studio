import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Nft, NftStatus } from "../../database/entities/Nft";
import { ValidatedLedgerTransaction } from "../blockchain/types";
import { NFTokenMint } from "xrpl/dist/npm/models/transactions/NFTokenMint";
import { Repository } from "typeorm";
import { convertHexToString, decodeAccountID } from "xrpl";
import { User } from "../../database/entities/User";
import { Collection } from "../../database/entities/Collection";

@Injectable()
export class NftService {
    constructor(@InjectRepository(Nft) private readonly nftRepository: Repository<Nft>) {}

    /**
     * Creates an Nft entity from a given NFTokenMint transaction
     * @param Account
     * @param Flags
     * @param TransferFee
     * @param Issuer
     * @param NFTokenTaxon
     * @param URI
     * @param hash
     */
    async createNftFromMintTransaction({
        Account,
        Flags,
        TransferFee,
        Issuer,
        NFTokenTaxon,
        URI,
        hash,
    }: ValidatedLedgerTransaction<NFTokenMint>): Promise<Nft> {
        // Get last nft tokenId from the Account user
        const lastNft = await this.nftRepository
            .createQueryBuilder("nft")
            .select("SUBSTRING(nft.token_id, 57, 64) as token_id")
            .where("nft.account = :account", { account: Account })
            .orderBy("SUBSTRING(nft.token_id, 57, 64)::bytea", "DESC")
            .getRawOne<{ token_id: string }>();
        // Build new nft's tokenId
        const lastTokenSequence = Number("0x" + (lastNft?.token_id || "0"));
        const tokenSequence = (lastTokenSequence + 1).toString(16).toUpperCase().padStart(8, "0");
        const flags = Flags?.toString(16).padStart(8, "0").substring(4).toUpperCase() || "0000";
        const transferFee = TransferFee?.toString(16).toUpperCase().padStart(4, "0") || "0000";
        const issuer = decodeAccountID(Issuer || Account)
            .toString("hex")
            .toUpperCase();
        const taxon = NFTokenTaxon?.toString(16).toUpperCase().padStart(8, "0") || "00000000";
        const tokenId = flags + transferFee + issuer + taxon + tokenSequence;

        // Create Account user, this will create the entity if it does not exist, otherwise it will reference to the existing user
        const user = new User();
        user.address = Account;

        // Create collection if there is an NFTokenTaxon
        let collection: Collection;
        if (NFTokenTaxon) {
            collection = new Collection();
            collection.taxon = NFTokenTaxon.toString();
            collection.user = user;
        }

        // Create the new Nft entity
        const nft = new Nft();
        nft.tokenId = tokenId;
        nft.mintTransactionHash = hash;
        if (Issuer) nft.issuer = Issuer;
        nft.transferFee = TransferFee;
        nft.flags = Number("0x" + flags);
        nft.uri = convertHexToString(URI);
        nft.status = NftStatus.CONFIRMED;
        nft.user = user;
        nft.collection = collection;

        try {
            const savedNft = await this.nftRepository.save(nft);
            return savedNft;
        } catch (e) {
            throw { error: e, nft };
        }
    }
}

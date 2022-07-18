import { Inject, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Nft, NftStatus } from "../../database/entities/Nft";
import { ValidatedLedgerTransaction } from "../blockchain/types";
import { NFTokenMint } from "xrpl/dist/npm/models/transactions/NFTokenMint";
import { Repository } from "typeorm";
import { decodeAccountID } from "xrpl";
import { User } from "../../database/entities/User";
import { Collection } from "../../database/entities/Collection";
import { CollectionService } from "../collection/collection.service";
import { InjectQueue } from "@nestjs/bull";
import { Queue } from "bull";
import { MetadataDto } from "./dto/metadata.dto";
import { NftMetadata } from "../../database/entities/NftMetadata";
import { NftMetadataAttribute } from "../../database/entities/NftMetadataAttribute";

@Injectable()
export class NftService {
    constructor(
        @InjectRepository(Nft) private readonly nftRepository: Repository<Nft>,
        @InjectQueue("metadata") private readonly metadataQueue: Queue,
        @Inject(CollectionService) private readonly collectionService: CollectionService,
    ) {}

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
        const issuerOrCreator = Issuer || Account;
        // Get last nft tokenId from the Issuer
        const lastNft = await this.nftRepository
            .createQueryBuilder("nft")
            .select("SUBSTRING(nft.token_id, 57, 64) as token_id")
            .where("nft.issuer = :issuer", { issuer: issuerOrCreator })
            .orderBy("SUBSTRING(nft.token_id, 57, 64)::bytea", "DESC")
            .getRawOne<{ token_id: string }>();
        // Build new nft's tokenId
        const lastTokenSequence = Number("0x" + (lastNft?.token_id || "0"));
        const tokenSequence = (lastTokenSequence + 1).toString(16).toUpperCase().padStart(8, "0");
        const flags = Flags?.toString(16).padStart(8, "0").substring(4).toUpperCase() || "0000";
        const transferFee = TransferFee?.toString(16).toUpperCase().padStart(4, "0") || "0000";
        const issuer = decodeAccountID(issuerOrCreator).toString("hex").toUpperCase();
        const taxon = NFTokenTaxon?.toString(16).toUpperCase().padStart(8, "0") || "00000000";
        const tokenId = flags + transferFee + issuer + taxon + tokenSequence;

        // Create Account user, this will create the entity if it does not exist, otherwise it will reference to the existing user
        const user = new User();
        user.address = Account;

        // Create collection if there is an NFTokenTaxon. Cannot use cascade as we are inserting a collection without primary key
        let collection: Collection;
        if (NFTokenTaxon) {
            collection = await this.collectionService.findCollectionByTaxonAndAccount(NFTokenTaxon.toString(), Account);
            if (!collection) {
                collection = new Collection();
                collection.taxon = NFTokenTaxon.toString();
                collection.user = user;
            }
        }

        // Create the new Nft entity
        const nft = new Nft();
        nft.tokenId = tokenId;
        nft.mintTransactionHash = hash;
        nft.issuer = issuerOrCreator;
        nft.transferFee = TransferFee;
        nft.flags = Number("0x" + flags);
        // May not be necessary in mainnet release but has to be checked in devnet in order to store the nft even if the uri is invalid
        nft.uri = URI && URI.length < 256 ? URI : undefined;
        nft.status = NftStatus.CONFIRMED;
        nft.user = user;
        nft.collection = collection;

        try {
            const savedNft = await this.nftRepository.save(nft);
            if (nft.uri) await this.metadataQueue.add("process-metadata", { nft }, { timeout: 25000, removeOnFail: true });
            return savedNft;
        } catch (e) {
            throw { error: e, nft };
        }
    }

    /**
     * Creates NftMetadata and assigns it to an Nft
     * @param nft
     * @param name
     * @param description
     * @param image
     * @param backgroundColor
     * @param externalUrl
     * @param attributes
     */
    async createNftMetadata(nft: Nft, { name, description, image, backgroundColor, externalUrl, attributes }: MetadataDto): Promise<Nft> {
        // Create attributes with nftMetadataId = nft.id, as it will be the value for nftMetadata.id
        const metadataAttributes = attributes?.map((attribute) => new NftMetadataAttribute({ nftMetadataId: nft.id, ...attribute }));
        // Create metadata related to the nft
        nft.metadata = new NftMetadata({ name, description, image, backgroundColor, externalUrl, attributes: metadataAttributes, nft });
        // Let typeorm cascades do the work
        return this.nftRepository.save(nft);
    }
}

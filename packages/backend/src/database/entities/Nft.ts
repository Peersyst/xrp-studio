import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { User } from "./User";
import { NftMetadata } from "./NftMetadata";
import { Collection } from "./Collection";
import { NftInDrop } from "./NftInDrop";

export enum NftStatus {
    DRAFT = "draft",
    PENDING = "pending",
    CONFIRMED = "confirmed",
    FAILED = "failed",
}

@Entity("nft")
export class Nft {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: "token_id", type: "varchar", length: "255", unique: true, nullable: true })
    tokenId?: string;

    @Column({ name: "mint_transaction_hash", type: "varchar", length: "255", unique: true, nullable: true })
    mintTransactionHash?: string;

    @Column({ type: "varchar", length: 255 })
    issuer: string;

    @Column({ name: "transfer_fee", nullable: true })
    transferFee?: number;

    @Column()
    flags: number;

    // Hexadecimal encoded uri
    @Column({ type: "varchar", length: 255, nullable: true })
    uri?: string;

    @Column({ type: "enum", enum: NftStatus, default: NftStatus.DRAFT })
    status: NftStatus;

    @Column({ type: "varchar", length: 255, name: "account" })
    account: string;

    @ManyToOne(() => User, (user) => user.nfts, { cascade: ["insert"] })
    @JoinColumn({ name: "account" })
    user: User;

    @Column({ type: "int", name: "collection_id", nullable: true })
    collectionId?: number;

    @ManyToOne(() => Collection, (collection) => collection.nfts, { nullable: true, cascade: ["insert"] })
    @JoinColumn({ name: "collection_id" })
    collection?: Collection;

    @OneToOne(() => NftMetadata, (metadata) => metadata.nft, { cascade: true })
    metadata?: NftMetadata;

    @OneToOne(() => NftInDrop, (nftInDrop) => nftInDrop.nft)
    nftInDrop?: NftInDrop;

    @CreateDateColumn({ name: "created_at", type: "timestamp" })
    createdAt: Date;

    @UpdateDateColumn({ name: "updated_at", type: "timestamp" })
    updatedAt: Date;

    constructor({
        id,
        tokenId,
        mintTransactionHash,
        issuer,
        transferFee,
        flags,
        uri,
        status,
        user,
        collection,
        metadata,
    }: Partial<Nft> = {}) {
        this.id = id;
        this.tokenId = tokenId;
        this.mintTransactionHash = mintTransactionHash;
        this.issuer = issuer;
        this.transferFee = transferFee;
        this.flags = flags;
        this.uri = uri;
        this.status = status;
        this.user = user;
        this.collection = collection;
        this.metadata = metadata;
    }
}

import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { User } from "./User";
import { NftMetadata } from "./NftMetadata";
import { Collection } from "./Collection";

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

    @Column({ type: "varchar", length: 255, nullable: true })
    issuer?: string;

    @Column({ name: "transfer_fee", nullable: true })
    transferFee?: number;

    @Column()
    flags: number;

    @Column({ type: "text", nullable: true })
    uri?: string;

    @Column({ type: "enum", enum: NftStatus, default: NftStatus.DRAFT })
    status: NftStatus;

    @ManyToOne(() => User, (user) => user.nfts, { cascade: ["insert"] })
    @JoinColumn({ name: "account" })
    user: User;

    @ManyToOne(() => Collection, (collection) => collection.nfts, { nullable: true, cascade: ["insert"] })
    @JoinColumn({ name: "collection_id" })
    collection?: Collection;

    @OneToOne(() => NftMetadata, (metadata) => metadata.nft)
    metadata?: NftMetadata;

    @CreateDateColumn({ name: "created_at", type: "timestamp" })
    createdAt: Date;

    @UpdateDateColumn({ name: "updated_at", type: "timestamp" })
    updatedAt: Date;
}

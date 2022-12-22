import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { User } from "./User";
import { NftInDrop } from "./NftInDrop";
import { Nft } from "./Nft";

export enum OfferType {
    SELL = "sell",
    BUY = "buy",
}

@Entity("offer")
export class Offer {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: "offer_id", type: "varchar", length: "255", unique: true, nullable: false })
    offerId: string;

    @Column({ name: "nft_id", type: "int" })
    nftId: number;

    @Column({ name: "creator_account", type: "varchar", length: 255 })
    creatorAccount: string;

    @Column({ name: "accepter_account", type: "varchar", length: 255, nullable: true })
    accepterAccount?: string;

    @Column({ name: "owner", type: "varchar", length: 255, nullable: true })
    owner?: string;

    @Column({ name: "amount", type: "varchar", length: 255 })
    amount: string;

    @Column({ name: "expiration", type: "int", nullable: true })
    expiration?: number;

    @Column({ name: "destination", type: "varchar", length: 255, nullable: true })
    destination?: string;

    @Column({ name: "offer_hash", type: "varchar", length: 255 })
    offerHash: string;

    @Column({ name: "accept_offer_hash", type: "varchar", length: 255, nullable: true })
    acceptOfferHash?: string;

    @Column({ type: "enum", enum: OfferType })
    type: OfferType;

    @ManyToOne(() => User, (user) => user.createdOffers, { cascade: ["insert"] })
    @JoinColumn({ name: "creator_account" })
    creatorUser: User;

    @ManyToOne(() => User, (user) => user.acceptedOffers, { cascade: ["insert"] })
    @JoinColumn({ name: "accepter_account" })
    accepterUser: User;

    @ManyToOne(() => Nft, (nft) => nft.offers, { cascade: true })
    nft?: Nft;

    @OneToOne(() => NftInDrop, (nftInDrop) => nftInDrop.nft)
    nftInDrop?: NftInDrop;

    @CreateDateColumn({ name: "created_at", type: "timestamp" })
    createdAt: Date;

    @UpdateDateColumn({ name: "updated_at", type: "timestamp" })
    updatedAt: Date;
}

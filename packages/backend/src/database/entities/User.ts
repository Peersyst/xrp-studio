import { Entity, Column, PrimaryColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from "typeorm";
import { Collection } from "./Collection";
import { Nft } from "./Nft";
import { Offer } from "./Offer";

@Entity("user")
export class User {
    @PrimaryColumn({ type: "varchar", length: 255 })
    address: string;

    @Column({ type: "varchar", length: 255, unique: true, nullable: true })
    name?: string;

    @Column({ type: "text", nullable: true })
    description?: string;

    @Column({ type: "text", nullable: true })
    image?: string;

    @Column({ type: "text", nullable: true })
    header?: string;

    @Column({ type: "varchar", length: 255, nullable: true })
    twitter?: string;

    @Column({ type: "varchar", length: 255, nullable: true })
    discord?: string;

    @Column({ type: "boolean", name: "verified_artist", nullable: false, default: false })
    verifiedArtist: boolean;

    @Column({ type: "int", nullable: true })
    priority?: number;

    @OneToMany(() => Nft, (nft) => nft.user)
    nfts?: Nft[];

    @OneToMany(() => Nft, (nft) => nft.ownerUser)
    ownedNfts?: Nft[];

    @OneToMany(() => Offer, (offer) => offer.creatorUser, { cascade: ["insert"] })
    createdOffers?: Offer[];

    @OneToMany(() => Offer, (offer) => offer.accepterUser, { cascade: ["insert"] })
    acceptedOffers?: Offer[];

    @OneToMany(() => Collection, (collection) => collection.user)
    collections?: Collection[];

    @CreateDateColumn({ name: "created_at", type: "timestamp" })
    createdAt: Date;

    @UpdateDateColumn({ name: "updated_at", type: "timestamp" })
    updatedAt: Date;

    constructor({ address, name, description, image, header, twitter, discord, nfts, collections, verifiedArtist }: Partial<User> = {}) {
        this.address = address;
        this.name = name;
        this.description = description;
        this.image = image;
        this.header = header;
        this.twitter = twitter;
        this.discord = discord;
        this.nfts = nfts;
        this.collections = collections;
        this.verifiedArtist = verifiedArtist;
    }
}

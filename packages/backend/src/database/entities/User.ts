import { Entity, Column, PrimaryColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from "typeorm";
import { Collection } from "./Collection";
import { Nft } from "./Nft";

@Entity("user")
export class User {
    @PrimaryColumn({ type: "varchar", length: 255 })
    address: string;

    @Column({ type: "varchar", length: 255, unique: true, nullable: true })
    name?: string;

    @Column({ type: "text", unique: true, nullable: true })
    description?: string;

    @Column({ type: "text", nullable: true })
    image?: string;

    @Column({ type: "text", nullable: true })
    header?: string;

    @Column({ type: "varchar", length: 255, nullable: true })
    twitter?: string;

    @Column({ type: "varchar", length: 255, nullable: true })
    discord?: string;

    @OneToMany(() => Nft, (nft) => nft.user)
    nfts?: Nft[];

    @OneToMany(() => Collection, (collection) => collection.user)
    collections?: Collection[];

    @CreateDateColumn({ name: "created_at", type: "timestamp" })
    createdAt: Date;

    @UpdateDateColumn({ name: "updated_at", type: "timestamp" })
    updatedAt: Date;

    constructor({ address, name, description, image, header, twitter, discord, nfts, collections }: Partial<User> = {}) {
        this.address = address;
        this.name = name;
        this.description = description;
        this.image = image;
        this.header = header;
        this.twitter = twitter;
        this.discord = discord;
        this.nfts = nfts;
        this.collections = collections;
    }
}

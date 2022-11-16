import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    OneToMany,
    OneToOne,
    PrimaryGeneratedColumn,
    Unique,
    UpdateDateColumn,
} from "typeorm";
import { Collection } from "./Collection";
import { Faq } from "./Faq";
import { Nft } from "./Nft";

@Entity("drop")
@Unique(["taxon", "user"])
export class Drop {
    @PrimaryGeneratedColumn()
    id: number;

    @Column("int", { name: "collection_id" })
    collectionId: number;

    @Column({ type: "varchar", length: 255 })
    price: string;

    @Column({ type: "varchar", length: 7 })
    backgroundColor: string;

    @Column({ type: "varchar", length: 7 })
    fontColor: string;

    @Column({ type: "varchar", length: 1023 })
    videoUrl: string;

    @Column({ type: "varchar", length: 255 })
    instagram: string;

    @Column({ type: "varchar", length: 255 })
    twitter: string;

    @Column({ type: "varchar", length: 255 })
    discord: string;

    @OneToOne(() => Collection, (collection) => collection.drop)
    @JoinColumn([{ name: "collection_id", referencedColumnName: "id" }])
    collection?: Collection;

    @OneToMany(() => Faq, (faq) => faq.drop, { cascade: ["insert"] })
    faqs: Faq[];

    @OneToMany(() => Nft, (nft) => nft.drop)
    nfts: Nft[];

    @CreateDateColumn({ name: "created_at", type: "timestamp" })
    createdAt: Date;

    @UpdateDateColumn({ name: "updated_at", type: "timestamp" })
    updatedAt: Date;
}

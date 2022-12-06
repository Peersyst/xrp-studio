import { Column, CreateDateColumn, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Collection } from "./Collection";
import { Faq } from "./Faq";
import { NftInDrop } from "./NftInDrop";

@Entity("drop")
export class Drop {
    @PrimaryGeneratedColumn()
    id: number;

    @Column("int", { name: "collection_id" })
    collectionId: number;

    @Column({ type: "varchar", length: 255 })
    price: string;

    @Column({ type: "int" })
    items: number;

    @Column({ type: "int", default: 0 })
    soldItems: number;

    @Column({ type: "varchar", length: 7 })
    backgroundColor: string;

    @Column({ type: "varchar", length: 7 })
    fontColor: string;

    @Column({ type: "varchar", length: 1023, nullable: true })
    videoUrl?: string;

    @Column({ type: "varchar", length: 255, nullable: true })
    instagram?: string;

    @Column({ type: "varchar", length: 255, nullable: true })
    twitter?: string;

    @Column({ type: "varchar", length: 1023, nullable: true })
    discord?: string;

    @OneToOne(() => Collection, (collection) => collection.drop)
    @JoinColumn([{ name: "collection_id", referencedColumnName: "id" }])
    collection?: Collection;

    @OneToMany(() => Faq, (faq) => faq.drop, { cascade: ["insert"] })
    faqs: Faq[];

    @OneToMany(() => NftInDrop, (nftInDrop) => nftInDrop.drop)
    nftsInDrop: NftInDrop[];

    @CreateDateColumn({ name: "created_at", type: "timestamp" })
    createdAt: Date;

    @UpdateDateColumn({ name: "updated_at", type: "timestamp" })
    updatedAt: Date;
}

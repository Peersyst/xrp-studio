import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToMany,
    OneToOne,
    PrimaryGeneratedColumn,
    Unique,
    UpdateDateColumn,
} from "typeorm";
import { User } from "./User";
import { Nft } from "./Nft";
import { Drop } from "./Drop";

@Entity("collection")
@Unique(["taxon", "user"])
export class Collection {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "bigint" })
    taxon: string;

    @Column({ type: "varchar", length: 64, nullable: true })
    name?: string;

    @Column({ type: "text", nullable: true })
    description?: string;

    @Column({ type: "text", nullable: true })
    image?: string;

    @Column({ type: "text", nullable: true })
    header?: string;

    @Column({ type: "int", nullable: true })
    items: number;

    @OneToMany(() => Nft, (nft) => nft.collection, { cascade: ["insert"] })
    nfts: Nft[];

    @Column({ type: "varchar", length: 255, name: "account" })
    account: string;

    @Column({ type: "int", nullable: true })
    priority?: number;

    @Column({ type: "varchar", length: 255, nullable: false, unique: true })
    path: string;

    @OneToOne(() => Drop, (drop) => drop.collection)
    drop?: Drop;

    @ManyToOne(() => User, (user) => user.collections)
    @JoinColumn({ name: "account" })
    user: User;

    @CreateDateColumn({ name: "created_at", type: "timestamp" })
    createdAt: Date;

    @UpdateDateColumn({ name: "updated_at", type: "timestamp" })
    updatedAt: Date;

    constructor({ id, taxon, name, description, image, header, nfts, user, path }: Partial<Collection> = {}) {
        this.id = id;
        this.taxon = taxon;
        this.name = name;
        this.description = description;
        this.image = image;
        this.header = header;
        this.nfts = nfts;
        this.user = user;
        this.path = path;
    }
}

import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
    Unique,
    UpdateDateColumn,
} from "typeorm";
import { User } from "./User";
import { Nft } from "./Nft";

@Entity("collection")
@Unique(["taxon", "user"])
export class Collection {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    taxon: number;

    @Column({ type: "varchar", length: 255, nullable: true })
    name?: string;

    @Column({ type: "text", nullable: true })
    description?: string;

    @Column({ type: "text", nullable: true })
    image?: string;

    @Column({ type: "text", nullable: true })
    header?: string;

    @OneToMany(() => Nft, (nft) => nft.collection, { cascade: ["insert"] })
    nfts: Nft[];

    @ManyToOne(() => User, (user) => user.collections)
    @JoinColumn({ name: "account" })
    user: User;

    @CreateDateColumn({ name: "created_at", type: "timestamp" })
    createdAt: Date;

    @UpdateDateColumn({ name: "updated_at", type: "timestamp" })
    updatedAt: Date;
}

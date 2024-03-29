import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryColumn, UpdateDateColumn } from "typeorm";
import { Nft } from "./Nft";
import { Drop } from "./Drop";

export enum NftInDropStatus {
    PENDING_AUTHORIZATION = "pending-authorization",
    AUTHORIZED = "authorized",
    MINTING = "minting",
    MINTED = "minted",
    CREATING_OFFER = "creating-offer",
    OFFER_CREATED = "offer-created",
    SOLD = "sold",
    FUNDING = "funding",
    FUNDED = "funded",
}

@Entity("nft_in_drop")
export class NftInDrop {
    @OneToOne(() => Nft, { primary: true })
    @JoinColumn({ name: "nft_id" })
    nft: Nft;

    @PrimaryColumn({ type: "int", name: "nft_id", nullable: false })
    nftId: number;

    @Column("int", { name: "drop_id" })
    dropId: number;

    @Column("varchar", { length: 255 })
    price: string;

    @Column("varchar", { length: 255, nullable: true })
    mintingTransactionHash?: string;

    @Column("varchar", { length: 255, nullable: true })
    offerTransactionHash?: string;

    @Column("varchar", { length: 255, nullable: true })
    acceptOfferTransactionHash?: string;

    @Column("varchar", { length: 255, nullable: true })
    fundingTransactionHash?: string;

    @Column("varchar", { length: 255, nullable: true })
    offerId?: string;

    @Column({ type: "enum", enum: NftInDropStatus, default: NftInDropStatus.PENDING_AUTHORIZATION })
    status: NftInDropStatus;

    @ManyToOne(() => Drop, (drop) => drop.nftsInDrop)
    @JoinColumn({ name: "drop_id" })
    drop?: Drop;

    @CreateDateColumn({ name: "created_at", type: "timestamp" })
    createdAt: Date;

    @UpdateDateColumn({ name: "updated_at", type: "timestamp" })
    updatedAt: Date;
}

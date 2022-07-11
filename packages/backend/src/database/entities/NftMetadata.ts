import { Column, CreateDateColumn, Entity, JoinColumn, OneToMany, OneToOne, UpdateDateColumn } from "typeorm";
import { Nft } from "./Nft";
import { NftMetadataAttribute } from "./NftMetadataAttribute";

@Entity("nft_metadata")
export class NftMetadata {
    @OneToOne(() => Nft, { primary: true, cascade: true })
    @JoinColumn({ name: "nft_id" })
    nft: Nft;

    @Column({ type: "varchar", length: 255, nullable: true })
    name?: string;

    @Column({ type: "text", nullable: true })
    description?: string;

    @Column({ type: "text", nullable: true })
    image?: string;

    // Hex #00000000
    @Column({ name: "background_color", type: "varchar", length: "9", nullable: true })
    backgroundColor?: string;

    @Column({ name: "external_url", type: "text", nullable: true })
    externalUrl?: string;

    @OneToMany(() => NftMetadataAttribute, (metadataAttribute) => metadataAttribute.metadata)
    attributes?: NftMetadataAttribute[];

    @CreateDateColumn({ name: "created_at", type: "timestamp" })
    createdAt: Date;

    @UpdateDateColumn({ name: "updated_at", type: "timestamp" })
    updatedAt: Date;
}

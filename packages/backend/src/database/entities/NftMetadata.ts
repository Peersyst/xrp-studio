import { Column, CreateDateColumn, Entity, JoinColumn, OneToMany, OneToOne, PrimaryColumn, UpdateDateColumn } from "typeorm";
import { Nft } from "./Nft";
import { NftMetadataAttribute } from "./NftMetadataAttribute";

@Entity("nft_metadata")
export class NftMetadata {
    @OneToOne(() => Nft, { primary: true })
    @JoinColumn({ name: "nft_id" })
    nft: Nft;

    @PrimaryColumn({ type: "int", name: "nft_id", nullable: false })
    nftId: number;

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

    @OneToMany(() => NftMetadataAttribute, (metadataAttribute) => metadataAttribute.metadata, { cascade: true })
    attributes?: NftMetadataAttribute[];

    @CreateDateColumn({ name: "created_at", type: "timestamp" })
    createdAt: Date;

    @UpdateDateColumn({ name: "updated_at", type: "timestamp" })
    updatedAt: Date;

    constructor({ nftId, nft, name, description, image, backgroundColor, externalUrl, attributes }: Partial<NftMetadata> = {}) {
        this.nftId = nftId;
        this.nft = nft;
        this.name = name;
        this.description = description;
        this.image = image;
        this.backgroundColor = backgroundColor;
        this.externalUrl = externalUrl;
        this.attributes = attributes;
    }
}

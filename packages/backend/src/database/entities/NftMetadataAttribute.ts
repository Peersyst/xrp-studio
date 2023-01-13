import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { NftMetadata } from "./NftMetadata";

@Entity("nft_metadata_attribute")
export class NftMetadataAttribute {
    @PrimaryGeneratedColumn()
    id: number;

    @PrimaryColumn({ name: "nft_metadata_id" })
    nftMetadataId: number;

    @Column({ name: "trait_type", type: "varchar", length: 255, nullable: true })
    traitType?: string;

    @Column({ type: "varchar", length: 255 })
    value: string;

    @Column({ name: "display_type", type: "varchar", length: 255, nullable: true })
    displayType?: string;

    @ManyToOne(() => NftMetadata, (metadata) => metadata.attributes)
    @JoinColumn({ name: "nft_metadata_id" })
    metadata: NftMetadata;

    @CreateDateColumn({ name: "created_at", type: "timestamp" })
    createdAt: Date;

    @UpdateDateColumn({ name: "updated_at", type: "timestamp" })
    updatedAt: Date;

    constructor({ nftMetadataId, traitType, value, displayType, metadata }: Partial<NftMetadataAttribute> = {}) {
        this.nftMetadataId = nftMetadataId;
        this.traitType = traitType;
        this.value = value;
        this.displayType = displayType;
        this.metadata = metadata;
    }
}

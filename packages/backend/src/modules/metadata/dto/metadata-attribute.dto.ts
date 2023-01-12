import { NftMetadataAttribute } from "../../../database/entities/NftMetadataAttribute";

export class MetadataAttributeDto {
    traitType: string;
    value: string;
    displayType?: string | null;

    constructor(traitType: string, value: string, displayType?: string | null) {
        this.traitType = traitType;
        this.value = value;
        this.displayType = displayType;
    }

    static fromEntity({ traitType, value, displayType }: NftMetadataAttribute): MetadataAttributeDto {
        return new MetadataAttributeDto(traitType, value, displayType);
    }
}

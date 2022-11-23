import { NftMetadataAttribute } from "../../../database/entities/NftMetadataAttribute";

export class MetadataAttributeDto {
    traitType: string;
    value: string;
    displayType?: string | null;

    static fromEntity({ traitType, value, displayType }: NftMetadataAttribute): MetadataAttributeDto {
        return {
            traitType,
            value,
            displayType,
        };
    }
}

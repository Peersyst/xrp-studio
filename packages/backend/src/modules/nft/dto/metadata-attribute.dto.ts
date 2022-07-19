import { NftMetadataAttribute } from "../../../database/entities/NftMetadataAttribute";

export class MetadataAttributeDto {
    traitType: string;
    value: string;
    displayType?: string;

    static fromEntity({ traitType, value, displayType }: NftMetadataAttribute): MetadataAttributeDto {
        return {
            traitType,
            value,
            displayType,
        };
    }
}

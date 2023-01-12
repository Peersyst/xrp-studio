import { NftMetadataAttribute } from "../../../database/entities/NftMetadataAttribute";

export class RawMetadataAttributeDto {
    trait_type: string;
    value: string;
    display_type?: string | null;

    static fromEntity({ traitType, value, displayType }: NftMetadataAttribute): RawMetadataAttributeDto {
        return {
            trait_type: traitType,
            value,
            display_type: displayType,
        };
    }
}

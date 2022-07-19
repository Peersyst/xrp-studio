import { MetadataAttributeDto } from "./metadata-attribute.dto";
import { NftMetadata } from "../../../database/entities/NftMetadata";

export class MetadataDto {
    name?: string;
    description?: string;
    image?: string;
    backgroundColor?: string;
    externalUrl?: string;
    attributes?: MetadataAttributeDto[];

    static fromEntity({ name, description, image, backgroundColor, externalUrl, attributes }: NftMetadata): MetadataDto {
        return {
            name,
            description,
            image,
            backgroundColor,
            externalUrl,
            attributes: attributes?.map((attribute) => MetadataAttributeDto.fromEntity(attribute)),
        };
    }
}

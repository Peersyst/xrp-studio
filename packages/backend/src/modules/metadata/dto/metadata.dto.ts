import { MetadataAttributeDto } from "./metadata-attribute.dto";
import { NftMetadata } from "../../../database/entities/NftMetadata";

export class MetadataDto {
    public name?: string;
    public description?: string;
    public image?: string;
    public backgroundColor?: string;
    public externalUrl?: string;
    public attributes?: MetadataAttributeDto[];

    constructor(
        name?: string,
        description?: string,
        image?: string,
        backgroundColor?: string,
        externalUrl?: string,
        attributes?: MetadataAttributeDto[],
    ) {
        this.name = name;
        this.description = description;
        this.image = image;
        this.backgroundColor = backgroundColor;
        this.externalUrl = externalUrl;
        this.attributes = attributes;
    }

    static fromEntity({ name, description, image, backgroundColor, externalUrl, attributes }: NftMetadata): MetadataDto {
        return new MetadataDto(
            name,
            description,
            image,
            backgroundColor,
            externalUrl,
            (attributes || [])?.map((attribute) => MetadataAttributeDto.fromEntity(attribute)),
        );
    }
}

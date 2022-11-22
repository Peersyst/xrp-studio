import { MetadataAttributeDto } from "./metadata-attribute.dto";
import { NftMetadata } from "../../../database/entities/NftMetadata";

export class MetadataDto {
    constructor(
        public name?: string,
        public description?: string,
        public image?: string,
        public backgroundColor?: string,
        public externalUrl?: string,
        public attributes?: MetadataAttributeDto[],
    ) {}

    static fromEntity({ name, description, image, backgroundColor, externalUrl, attributes }: NftMetadata): MetadataDto {
        return new MetadataDto(
            name,
            description,
            image,
            backgroundColor,
            externalUrl,
            attributes?.map((attribute) => MetadataAttributeDto.fromEntity(attribute)),
        );
    }

    public encode(): string {
        const finalObject: Partial<MetadataDto> = {};
        if (this.name) finalObject.name = this.name;
        if (this.description) finalObject.description = this.description;
        if (this.image) finalObject.image = this.image;
        if (this.backgroundColor) finalObject.backgroundColor = this.backgroundColor;
        if (this.externalUrl) finalObject.externalUrl = this.externalUrl;
        if (this.attributes) finalObject.attributes = this.attributes;
        return JSON.stringify(finalObject);
    }

    static decode(raw: string): MetadataDto {
        const metadata = JSON.parse(raw);
        return new MetadataDto(
            metadata.name,
            metadata.description,
            metadata.image,
            metadata.backgroundColor,
            metadata.externalUrl,
            metadata.attributes,
        );
    }
}

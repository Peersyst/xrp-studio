import { NftMetadata } from "../../../database/entities/NftMetadata";
import { RawMetadataAttributeDto } from "./raw-metadata-attribute.dto";

type MetadataSchema = {
    schema: string;
    nftType: string;
};

export class RawMetadataDto {
    public name?: string;
    public description?: string;
    public image?: string;
    public background_color?: string;
    public external_url?: string;
    public attributes?: RawMetadataAttributeDto[];

    constructor(
        name?: string,
        description?: string,
        image?: string,
        backgroundColor?: string,
        externalUrl?: string,
        attributes?: RawMetadataAttributeDto[],
    ) {
        this.name = name;
        this.description = description;
        this.image = image;
        this.background_color = backgroundColor;
        this.external_url = externalUrl;
        this.attributes = attributes;
    }

    static fromEntity({ name, description, image, backgroundColor, externalUrl, attributes }: NftMetadata): RawMetadataDto {
        return new RawMetadataDto(
            name,
            description,
            image,
            backgroundColor,
            externalUrl,
            (attributes || [])?.map((attribute) => RawMetadataAttributeDto.fromEntity(attribute)),
        );
    }

    public encode(): string {
        const finalObject: MetadataSchema & Partial<RawMetadataDto> = {
            schema: "ipfs://QmNpi8rcXEkohca8iXu7zysKKSJYqCvBJn3xJwga8jXqWU",
            nftType: "art.v0",
        };
        if (this.name) finalObject.name = this.name;
        if (this.description) finalObject.description = this.description;
        if (this.image) finalObject.image = this.image;
        if (this.background_color) finalObject.background_color = this.background_color;
        if (this.external_url) finalObject.external_url = this.external_url;
        if (this.attributes) finalObject.attributes = this.attributes;
        return JSON.stringify(finalObject);
    }

    static decode(raw: string): RawMetadataDto {
        const metadata = JSON.parse(raw);
        return new RawMetadataDto(
            metadata.name,
            metadata.description,
            metadata.image,
            metadata.background_color,
            metadata.external_url,
            metadata.attributes,
        );
    }
}

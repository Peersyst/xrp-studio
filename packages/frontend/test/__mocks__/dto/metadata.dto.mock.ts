import { MetadataAttributeDto, MetadataDto } from "module/api/service";
import { MetadataAttributeDtoMock } from "./metadata-attribute.dto.mock";

export class MetadataDtoMock {
    name?: string;
    description?: string;
    image?: string;
    backgroundColor?: string;
    externalUrl?: string;
    attributes?: Array<MetadataAttributeDto>;

    constructor({
        name = "nft_name",
        description = "nft_description",
        image = "nft_image_url",
        backgroundColor,
        externalUrl,
        attributes = [
            new MetadataAttributeDtoMock({ traitType: "attr1", value: "val1" }),
            new MetadataAttributeDtoMock({ traitType: "attr2", value: "val2" }),
        ],
    }: Partial<MetadataDto> = {}) {
        this.name = name;
        this.description = description;
        this.image = image;
        this.backgroundColor = backgroundColor;
        this.externalUrl = externalUrl;
        this.attributes = attributes;
    }
}

import { MetadataDto } from "../../../src/modules/nft/dto/metadata.dto";
import { MetadataAttributeDto } from "../../../src/modules/nft/dto/metadata-attribute.dto";
import MetadataAttributeDtoMock from "./metadata-attribute.dto.mock";

class MetadataDtoMock implements MetadataDto {
    name?: string;
    description?: string;
    image?: string;
    backgroundColor?: string;
    externalUrl?: string;
    attributes?: MetadataAttributeDto[];

    constructor({
        name = "NFT #1",
        description = "First NFT ever created",
        image = "https://nft-image.com",
        backgroundColor = "#FFFFFF",
        externalUrl,
        attributes = [
            new MetadataAttributeDtoMock({ traitType: "trait1", value: "1" }),
            new MetadataAttributeDtoMock({ traitType: "trait2", value: "2" }),
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

export default MetadataDtoMock;

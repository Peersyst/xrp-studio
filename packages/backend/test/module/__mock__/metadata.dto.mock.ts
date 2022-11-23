import { MetadataDto } from "../../../src/modules/metadata/dto/metadata.dto";
import MetadataAttributeDtoMock from "./metadata-attribute.dto.mock";

class MetadataDtoMock extends MetadataDto {
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
        super(name, description, image, backgroundColor, externalUrl, attributes);
    }
}

export default MetadataDtoMock;

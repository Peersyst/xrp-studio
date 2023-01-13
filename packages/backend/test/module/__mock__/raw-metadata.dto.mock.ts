import { RawMetadataDto } from "../../../src/modules/metadata/dto/raw-metadata.dto";
import RawMetadataAttributeDtoMock from "./raw-metadata-attribute.dto.mock";

class RawMetadataDtoMock extends RawMetadataDto {
    constructor({
        name = "NFT #1",
        description = "First NFT ever created",
        image = "https://nft-image.com",
        background_color = "#FFFFFF",
        external_url,
        attributes = [
            new RawMetadataAttributeDtoMock({ trait_type: "trait1", value: "1" }),
            new RawMetadataAttributeDtoMock({ trait_type: "trait2", value: "2" }),
        ],
    }: Partial<RawMetadataDto> = {}) {
        super(name, description, image, background_color, external_url, attributes);
    }
}

export default RawMetadataDtoMock;

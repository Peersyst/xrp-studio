import { NftMetadata } from "../../../src/database/entities/NftMetadata";
import NftMock from "./nft.mock";
import NftMetadataAttributeMock from "./nft-metadata-attribute.mock";

class NftMetadataMock extends NftMetadata {
    constructor({
        nft = new NftMock(),
        name = "NFT #1",
        description = "First NFT ever created",
        image = "https://nft-image.com",
        backgroundColor = "#FFFFFF",
        externalUrl,
        attributes = [
            new NftMetadataAttributeMock({ traitType: "trait1", value: "1" }),
            new NftMetadataAttributeMock({ traitType: "trait2", value: "2" }),
        ],
    }: Partial<NftMetadata> = {}) {
        super({ nft, name, description, image, backgroundColor, externalUrl, attributes });
    }
}

export default NftMetadataMock;

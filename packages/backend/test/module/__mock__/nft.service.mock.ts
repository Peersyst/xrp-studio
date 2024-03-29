import BaseMock from "./base.mock";
import NftMock from "./nft.mock";
import NftMetadataMock from "./nft-metadata.mock";

class NftServiceMock extends BaseMock {
    createNftFromMintTransaction = jest.fn(() => new NftMock());
    createNftMetadata = jest.fn(() => new NftMock({ metadata: new NftMetadataMock() }));
    createNftDraft = jest.fn();
    findOne = jest.fn().mockReturnValue(new NftMock());
}

export default NftServiceMock;

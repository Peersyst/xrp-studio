import BaseMock from "./base.mock";
import NftMock from "./nft.mock";

class NftServiceMock extends BaseMock {
    createNftFromMintTransaction = jest.fn(() => new NftMock());
}

export default NftServiceMock;

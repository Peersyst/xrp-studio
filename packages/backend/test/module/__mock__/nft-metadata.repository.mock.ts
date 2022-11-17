import BaseMock from "./base.mock";
import NftMetadata from "./nft-metadata.mock";

class NftMetadataRepositoryMock extends BaseMock {
    delete = jest.fn();
    save = jest.fn();
    findOne = jest.fn(({ nftId }: { nftId: number }) => {
        if (nftId > 0) return new Promise((resolve) => resolve(new NftMetadata()));
        else return undefined;
    });
    create = jest.fn((nftId, data) => {
        return { ...data, nftId };
    });
}

export default NftMetadataRepositoryMock;

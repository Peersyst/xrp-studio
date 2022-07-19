import BaseMock from "./base.mock";

class NftMetadataRepositoryMock extends BaseMock {
    delete = jest.fn();
}

export default NftMetadataRepositoryMock;

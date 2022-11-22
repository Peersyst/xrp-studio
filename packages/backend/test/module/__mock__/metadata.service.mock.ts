import BaseMock from "./base.mock";
import MetadataDtoMock from "./metadata.dto.mock";

class MetadataServiceMock extends BaseMock {
    retrieveMetadata = jest.fn(() => new MetadataDtoMock());
    create = jest.fn((nftId, data) => ({ nftId, ...data }));
    delete = jest.fn();
    publishMetadata = jest.fn(() => "cid");
    sendToProcessMetadata = jest.fn();
}

export default MetadataServiceMock;

import BaseMock from "./base.mock";

class StorageServiceMock extends BaseMock {
    storeFileFromBuffer = jest.fn();
}

export default StorageServiceMock;

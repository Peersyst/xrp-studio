import BaseMock from "./base.mock";

class XummTransactionServiceMock extends BaseMock {
    sendTransactionRequest = jest.fn();
}

export default XummTransactionServiceMock;

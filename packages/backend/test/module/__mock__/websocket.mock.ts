import BaseMock from "./base.mock";

class WebsocketMock extends BaseMock {
    onmessage = jest.fn();
    close = jest.fn();
}

export default WebsocketMock;

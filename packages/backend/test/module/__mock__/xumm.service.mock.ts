import BaseMock from "./base.mock";
import WebsocketMock from "./websocket.mock";

class XummServiceMock extends BaseMock {
    websocket = new WebsocketMock();
    transactionRequestAndSubscribe = jest.fn(() => new Promise((resolve) => resolve({ websocket: this.websocket })));

    clear() {
        super.clear();
        this.websocket.clear();
    }
}

export default XummServiceMock;

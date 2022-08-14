import { Client } from "xrpl";
import BaseMock from "./base.mock";

class XrplClientMock extends BaseMock {
    connect = jest.spyOn(Client.prototype, "connect").mockImplementation();
    request = jest.spyOn(Client.prototype, "request").mockImplementation();
}

export default XrplClientMock;

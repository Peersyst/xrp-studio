import { Logger } from "@nestjs/common";
import BaseMock from "./base.mock";

class LoggerMock extends BaseMock {
    log = jest.spyOn(Logger.prototype, "log").mockImplementation();
    error = jest.spyOn(Logger.prototype, "error").mockImplementation();
}

export default LoggerMock;

import BaseMock from "./base.mock";

export const ACCESS_TOKEN = "ACCESS_TOKEN";

class JwtServiceMock extends BaseMock {
    sign = jest.fn(() => ACCESS_TOKEN);
}

export default JwtServiceMock;

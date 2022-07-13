import BaseMock from "./base.mock";

class ConfigServiceMock extends BaseMock {
    get = jest.fn((key: string) => {
        switch (key) {
            case "server.port":
                return 3000;
            case "server.baseUrl":
                return "";
            case "xrp.node":
                return "wss://s.altnet.rippletest.net/";
            case "xrp.startingLedgerIndex":
                return 10;
            default:
                return "default-config-setting";
        }
    });
}
export default ConfigServiceMock;

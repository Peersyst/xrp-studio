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
            case "xrp.minterSecret":
                return "sEdV5BZUNSbbpJpHPicgqU9Ef3WzHyP";
            case "pinata.publicGateway":
                return "https://pinata.gateway.com/";
            case "defaultImages.profile":
                return "default_profile_img_url";
            case "defaultImages.header":
                return "default_header_img_url";
            case "user.isVerified":
                return true;
            case "auction.googleTimezoneUTC":
                return "UTC+1";
            case "auction.extensionSeconds":
                return 5 * 60;
            default:
                return "default-config-setting";
        }
    });
}
export default ConfigServiceMock;

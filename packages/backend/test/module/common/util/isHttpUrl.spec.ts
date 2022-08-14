import isHttpUrl from "../../../../src/modules/common/util/isHttpUrl";

describe("isHttpUrl", () => {
    test("Returns true", () => {
        expect(isHttpUrl("https://dev.peersyst.com/xrp-studio")).toBe(true);
    });
    test("Returns false", () => {
        expect(isHttpUrl("ipfs://ipfs-cid")).toBe(false);
    });
});

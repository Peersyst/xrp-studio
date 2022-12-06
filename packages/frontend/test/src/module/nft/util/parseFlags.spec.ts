import parseFlags from "module/nft/util/parseFlags";

describe("parseFlags", () => {
    test("Returns all false", () => {
        expect(parseFlags(0)).toEqual({
            burnable: false,
            onlyXRP: false,
            trustLine: false,
            transferable: false,
        });
    });

    test("Returns burnable true", () => {
        expect(parseFlags(1)).toEqual({
            burnable: true,
            onlyXRP: false,
            trustLine: false,
            transferable: false,
        });
    });

    test("Returns onlyXRP true", () => {
        expect(parseFlags(2)).toEqual({
            burnable: false,
            onlyXRP: true,
            trustLine: false,
            transferable: false,
        });
    });

    test("Returns transferable true", () => {
        expect(parseFlags(8)).toEqual({
            burnable: false,
            onlyXRP: false,
            trustLine: false,
            transferable: true,
        });
    });
});

import flagsToNumber from "../../../../src/modules/nft/util/flagsToNumber";

describe("flagsToNumber", () => {
    test("Returns 0", () => {
        expect(flagsToNumber({})).toEqual(0);
    });

    test("Returns 1", () => {
        expect(flagsToNumber({ tfBurnable: true })).toEqual(1);
    });

    test("Returns 3", () => {
        expect(flagsToNumber({ tfBurnable: true, tfOnlyXRP: true })).toEqual(3);
    });

    test("Returns 7", () => {
        expect(flagsToNumber({ tfBurnable: true, tfOnlyXRP: true, tfTrustLine: true })).toEqual(7);
    });

    test("Returns 15", () => {
        expect(flagsToNumber({ tfBurnable: true, tfOnlyXRP: true, tfTrustLine: true, tfTransferable: true })).toEqual(15);
    });
});

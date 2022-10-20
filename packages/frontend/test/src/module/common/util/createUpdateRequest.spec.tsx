import createUpdateRequest from "module/common/util/createUpdateRequest";

describe("createUpdateRequest", () => {
    test("Creates an update request with undefined", () => {
        const rawReq = {
            a: 0,
            b: "value",
            c: false,
            d: null,
            e: "",
        };
        expect(createUpdateRequest(rawReq)).toEqual({ a: 0, b: "value", c: false });
    });
});

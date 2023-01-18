import isDraft from "module/nft/util/isDraft";
import { NftDtoMock } from "test-mocks";

describe("isDraft", () => {
    test("Returns true when status = draft", () => {
        expect(isDraft(new NftDtoMock({ status: "draft" })));
    });
    test("Returns true when status = failed", () => {
        expect(isDraft(new NftDtoMock({ status: "failed" })));
    });
    test("Returns true when status = pending", () => {
        expect(isDraft(new NftDtoMock({ status: "pending" })));
    });
    test("Returns true when status = confirmed", () => {
        expect(isDraft(new NftDtoMock({ status: "confirmed" })));
    });
});

import { act, renderHook } from "test-utils";
import { CollectionsDtoMock, UseFilterMock } from "test-mocks";
import useGetNftActiveTags from "module/nft/component/layout/NftGrid/hook/useGetNftActiveTags";

const renderUseGetNftActiveTag = () =>
    renderHook(() => {
        new UseFilterMock<string, true>({ filter: ["0", "1", "2", "3"] });
        const { collections } = new CollectionsDtoMock({ length: 6 });
        return useGetNftActiveTags(collections);
    });

describe("useGetNftActiveTags test", () => {
    afterAll(() => {
        jest.restoreAllMocks();
    });

    test("Get Tags correctly", () => {
        act(() => {
            const tags = renderUseGetNftActiveTag().result.current;
            expect(tags).toHaveLength(4);
            expect(tags[0].value).toBe("0");
        });
    });
});

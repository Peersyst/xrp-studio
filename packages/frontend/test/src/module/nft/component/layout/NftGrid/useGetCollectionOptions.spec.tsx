import { act, renderHook } from "test-utils";
import { CollectionsDtoMock } from "test-mocks";
import useGetCollectionOptions from "module/nft/component/layout/NftGrid/hook/useGetCollectionOptions";

const renderUseGetCollectionOptions = () =>
    renderHook(() => {
        const { collections } = new CollectionsDtoMock({ length: 6 });
        return useGetCollectionOptions(collections);
    });

describe("useGetCollectionOptions test", () => {
    afterAll(() => {
        jest.restoreAllMocks();
    });

    test("Get options correctly", () => {
        act(() => {
            const tags = renderUseGetCollectionOptions().result.current;
            expect(tags).toHaveLength(6);
            expect(tags[0].value).toBe(0);
        });
    });
});

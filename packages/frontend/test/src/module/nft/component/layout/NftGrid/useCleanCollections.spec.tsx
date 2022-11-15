import { act, renderHook } from "test-utils";
import useCleanCollections from "module/nft/component/layout/NftGrid/hook/useCleanCollections";
import { UseFilterMock } from "test-mocks";
const renderUseCleanCollections = () =>
    renderHook(() => {
        return useCleanCollections();
    });

describe("useCleanCollections test", () => {
    afterAll(() => {
        jest.restoreAllMocks();
    });

    test("Remove collections", () => {
        const { setFilter } = new UseFilterMock<string, true>({ filter: ["1", "2", "3"] });
        act(() => {
            const { cleanAllCollections, cleanCollection } = renderUseCleanCollections().result.current;
            cleanCollection("2");
            expect(setFilter).toHaveBeenCalledWith(["1", "3"]);
            cleanAllCollections();
            expect(setFilter).toHaveBeenCalledWith(undefined);
        });
    });
});

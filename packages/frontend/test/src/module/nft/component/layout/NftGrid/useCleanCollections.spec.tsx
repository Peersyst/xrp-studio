import { act, renderHook } from "test-utils";
import useCleanCollections from "module/nft/component/layout/NftGrid/hook/useCleanCollections";
import { UseFilterContextMock } from "test-mocks";

const renderUseCleanCollections = () =>
    renderHook(() => {
        return useCleanCollections();
    });

describe("useCleanCollections test", () => {
    afterAll(() => {
        jest.restoreAllMocks();
    });

    test("Remove collections", () => {
        const mockedSetFilters = jest.fn();
        new UseFilterContextMock({ filters: { ["collections"]: [1, 2, 3] }, setFilters: mockedSetFilters });
        act(() => {
            const { cleanAllCollections, cleanCollection } = renderUseCleanCollections().result.current;
            cleanCollection(2);
            expect(mockedSetFilters).toHaveBeenCalledWith({ ["collections"]: [1, 3] });
            cleanAllCollections();
            expect(mockedSetFilters).toHaveBeenCalledWith({ ["collections"]: undefined });
        });
    });
});

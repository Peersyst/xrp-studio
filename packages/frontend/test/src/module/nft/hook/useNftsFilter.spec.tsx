import { renderHook } from "test-utils";
import { UseSearchParamsMock } from "test-mocks";
import { BaseFiltersNames } from "module/common/component/input/Filters/Filters.types";
import useNftsFilters from "module/nft/hook/useNftsFilters";
import { NftFilterNames } from "module/nft/query/useGetNfts";

const renderUseNftsFilters = () => renderHook(() => useNftsFilters()).result;

describe("test for the useNftsFilters hook", () => {
    test("Gets all filters from url", () => {
        const mockFilters = {
            [BaseFiltersNames.QUERY]: "1",
            [BaseFiltersNames.ORDER]: "ASC",
            [NftFilterNames.COLLECTIONS]: "1",
        };

        new UseSearchParamsMock(mockFilters);

        const { current } = renderUseNftsFilters();
        expect(current).toEqual({ ...mockFilters, [NftFilterNames.COLLECTIONS]: [1] });
    });

    test("Get valid filter and clean the corrupted ones", () => {
        const goodFilters = { [BaseFiltersNames.QUERY]: "1", [BaseFiltersNames.ORDER]: "ASC" };
        const corruptedFilters = { ...goodFilters, [NftFilterNames.COLLECTIONS]: "notANumber" };

        new UseSearchParamsMock(corruptedFilters);

        const { current } = renderUseNftsFilters();
        expect(current).toEqual(goodFilters); //Return only valid filters
    });
});

import { renderHook } from "test-utils";
import { UseSearchParamsMock } from "test-mocks";
import { BaseFiltersNames } from "module/common/component/input/Filters/Filters.types";
import { createSearchParams } from "react-router-dom";
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
        const url = `?${new URLSearchParams(mockFilters).toString()}`;
        jest.spyOn(window, "location", "get").mockImplementation(() => ({ search: url } as Location));
        new UseSearchParamsMock();
        const { current } = renderUseNftsFilters();
        expect(current).toEqual({ ...mockFilters, [NftFilterNames.COLLECTIONS]: [1] });
    });

    test("Get valid filter and clean the corrupted ones", () => {
        const goodFilters = { [BaseFiltersNames.QUERY]: "1", [BaseFiltersNames.ORDER]: "ASC" };
        const corruptedFilters = { ...goodFilters, [NftFilterNames.COLLECTIONS]: "notANumber" };
        const url = `?${new URLSearchParams(corruptedFilters).toString()}`;
        jest.spyOn(window, "location", "get").mockImplementation(() => ({ search: url } as Location));
        const { setParams } = new UseSearchParamsMock();
        const { current } = renderUseNftsFilters();
        expect(current).toEqual(goodFilters); //Return only valid filters
        const newParams = createSearchParams(goodFilters);
        expect(setParams).toHaveBeenCalledWith(newParams); //remove corrupted filters from the url
    });
});

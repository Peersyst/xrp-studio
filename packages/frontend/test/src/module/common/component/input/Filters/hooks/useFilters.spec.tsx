import { renderHook } from "test-utils";
import { UseSearchParamsMock } from "test-mocks";
import useFilters from "module/common/component/input/Filters/hooks/useFilters/useFilters";
import { BaseFiltersNames } from "module/common/component/input/Filters/Filters.types";
import { BASE_FILTERS_DECLARATION, Filter } from "module/common/component/input/Filters/hooks/useFilters";
import { createSearchParams } from "react-router-dom";

const renderUseFilter = (filtersDeclaration?: Filter[]) => renderHook(() => useFilters(filtersDeclaration)).result;
describe("test for the useFilter hook", () => {
    test("Gets all filters from url", () => {
        const mockFilters = { [BaseFiltersNames.QUERY]: "1", [BaseFiltersNames.ORDER]: "ASC" };
        const url = `?${new URLSearchParams(mockFilters).toString()}`;
        jest.spyOn(window, "location", "get").mockImplementation(() => ({ search: url } as Location));
        new UseSearchParamsMock();
        const { current } = renderUseFilter();
        expect(current).toEqual(mockFilters);
    });
    test("Get valid filter and clean the corrupted ones", () => {
        const newDeclaration: Filter[] = [
            ...BASE_FILTERS_DECLARATION,
            {
                name: "test",
                type: "number",
            },
        ];
        const goodFilters = { [BaseFiltersNames.QUERY]: "1", [BaseFiltersNames.ORDER]: "ASC" };
        const corruptedFilters = { ...goodFilters, test: "notANumber" };
        const url = `?${new URLSearchParams(corruptedFilters).toString()}`;
        jest.spyOn(window, "location", "get").mockImplementation(() => ({ search: url } as Location));
        const { setParams } = new UseSearchParamsMock();
        const { current } = renderUseFilter(newDeclaration);
        expect(current).toEqual(goodFilters); //Return only valid filters
        const newParams = createSearchParams(goodFilters);
        expect(setParams).toHaveBeenCalledWith(newParams); //remove corrupted filters from the url
    });
});

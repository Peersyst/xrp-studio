import { renderHook } from "test-utils";
import { UseSearchParamsMock } from "test-mocks";
import useFilters from "module/common/component/input/Filters/hooks/useFilters/useFilters";
import { BaseFiltersNames } from "module/common/component/input/Filters/Filters.types";
import { BASE_FILTERS_DECLARATION, Filters } from "module/common/component/input/Filters/hooks/useFilters";

const renderUseFilter = (filtersDeclaration?: Filters) => renderHook(() => useFilters(filtersDeclaration)).result;
describe("test for the useFilter hook", () => {
    test("Gets all filters from url", () => {
        const mockFilters = { [BaseFiltersNames.QUERY]: "1", [BaseFiltersNames.ORDER]: "ASC" };

        new UseSearchParamsMock(mockFilters);

        const { current } = renderUseFilter();
        expect(current).toEqual(mockFilters);
    });
    test("Get valid filter and clean the corrupted ones", () => {
        const newDeclaration: Filters = {
            ...BASE_FILTERS_DECLARATION,
            test: {
                type: "number",
            },
        };
        const goodFilters = { [BaseFiltersNames.QUERY]: "1", [BaseFiltersNames.ORDER]: "ASC" };
        const corruptedFilters = { ...goodFilters, test: "notANumber" };

        new UseSearchParamsMock(corruptedFilters);

        const { current } = renderUseFilter(newDeclaration);
        expect(current).toEqual(goodFilters); //Return only valid filters
    });
});

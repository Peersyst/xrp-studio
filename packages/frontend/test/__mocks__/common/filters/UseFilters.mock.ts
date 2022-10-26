import { FiltersBaseContextValue, FiltersContext } from "module/common/component/input/Filters/FiltersContext";
import * as useFilters from "module/common/component/input/Filters/hooks/useFilters";
import BaseMock from "../../base.mock";

export class UseFilterMock<T extends FiltersBaseContextValue> extends BaseMock implements FiltersContext<T> {
    filters: any;
    setFilters: (newFilters: Partial<FiltersBaseContextValue>) => void;
    constructor({ filters = {}, setFilters = jest.fn() }: Partial<FiltersContext<{}>> = {}) {
        super();
        this.filters = filters;
        this.setFilters = setFilters;
        jest.spyOn(useFilters, "default").mockReturnValue(this);
    }
}

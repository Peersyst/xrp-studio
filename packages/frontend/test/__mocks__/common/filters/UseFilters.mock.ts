import { Loosen } from "@peersyst/react-types";
import { FiltersBaseContextValue, FiltersContextType } from "module/common/component/input/Filters/FiltersContext";
import * as useFilters from "module/common/component/input/Filters/hooks/useFilters";
import * as useFiltersContext from "module/common/component/input/Filters/hooks/useFiltersContext";
import BaseMock from "../../base.mock";

export interface UseFilterMockType<T> {
    filter: T;
    setFilter: (value: T) => void;
}

export class UseFilterContextMock<T extends FiltersBaseContextValue> extends BaseMock implements FiltersContextType<T> {
    filters: T;
    setFilters: (newFilters: Partial<FiltersBaseContextValue>) => void;

    constructor({ filters = {}, setFilters = jest.fn() }: Partial<FiltersContextType<FiltersBaseContextValue>> = {}) {
        super();
        this.filters = filters as T;
        this.setFilters = setFilters;
        jest.spyOn(useFiltersContext, "default").mockReturnValue(this);
    }
}

export class UseFilterMock<T> extends BaseMock implements UseFilterMockType<T> {
    filter: T;
    setFilter: (value: T) => void;

    constructor({ filter, setFilter = jest.fn() }: Loosen<UseFilterMockType<T>, "setFilter">) {
        super();
        this.filter = filter;
        this.setFilter = setFilter;
        jest.spyOn(useFilters, "default").mockReturnValue([this.filter, this.setFilter as any]);
    }
}

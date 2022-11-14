import { MultipleSelector } from "module/common/component/input/Filters/Filters.types";
import * as useFilter from "module/common/component/input/Filters/hooks/useFilter/useFilter";
import BaseMock from "../../base.mock";

export interface UseFilterMockType<T extends string, M extends boolean> {
    filter: MultipleSelector<T, M>;
    setFilter: (newFilters: MultipleSelector<T, M> | undefined) => void;
    multiple?: M;
}

export class UseFilterMock<T extends string = "filter", M extends boolean = false> extends BaseMock implements UseFilterMockType<T, M> {
    filter: MultipleSelector<T, M>;
    setFilter: (newFilters: MultipleSelector<T, M> | undefined) => void;

    constructor({ filter, setFilter = jest.fn(), multiple }: Partial<UseFilterMockType<T, M>> = {}) {
        super();
        this.filter = filter ?? ((multiple ? ["filter"] : "filter") as MultipleSelector<T, M>);
        this.setFilter = setFilter;
        this.mock = jest.spyOn(useFilter, "default").mockReturnValue([filter as any, setFilter as any]);
    }
}

import { PaginatedData } from "query-utils";
import { FiltersBaseContextValue, FiltersContext } from "../../input/Filters/FiltersContext";
import { BaseGridWithFilterProps } from "../BaseGridWithFilters/BaseGridWithFilters.types";

export interface GridProps<T extends PaginatedData, TagT, F extends FiltersBaseContextValue>
    extends Omit<BaseGridWithFilterProps<T, TagT, F>, "filters" | "filtersContext"> {
    filters?: BaseGridWithFilterProps<T, TagT, F>["filters"];
    /**
     * If the filters and the filtersContext are passed then the grid with filters is rendered,
     * if not then the base grid is rendered
     */
    filtersContext?: FiltersContext<F>;
}

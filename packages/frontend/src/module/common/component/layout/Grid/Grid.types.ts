import { PaginatedData } from "query-utils";
import { FiltersContext } from "../../input/Filters/FiltersContext";
import { BaseGridWithFilterProps } from "../BaseGridWithFilters/BaseGridWithFilters.types";

export interface GridProps<T extends PaginatedData, TagT, F> extends Omit<BaseGridWithFilterProps<T, TagT>, "filters"> {
    /**
     * If the filters are passed then the grid with filters is rendered,
     * if not then the base grid is rendered
     */
    filters?: BaseGridWithFilterProps<T, TagT>["filters"];
    /**
     * The filters context is used to pass the filters to the grid
     * when the filters are not passed as props
     */
    filtersContext?: FiltersContext<F>;
}

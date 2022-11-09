import { PaginatedData } from "query-utils";
import { BaseGridWithFilterProps } from "../BaseGridWithFilters/BaseGridWithFilters.types";

export interface GridProps<T extends PaginatedData, TagT = any> extends Omit<BaseGridWithFilterProps<T, TagT>, "filters"> {
    /**
     * If the filters are passed then the grid with filters is rendered,
     * if not then the base grid is rendered
     */
    filters?: BaseGridWithFilterProps<T, TagT>["filters"];
}

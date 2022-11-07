import { PaginatedData } from "query-utils";
import { BaseGridWithFilterProps } from "../BaseGridWithFilters/BaseGridWithFilters.types";

export interface GridProps<T extends PaginatedData, TagT> extends Omit<BaseGridWithFilterProps<T, TagT>, "filters" | "filtersContext"> {
    filters?: BaseGridWithFilterProps<T, TagT>["filters"];
    withFilters?: boolean;
}

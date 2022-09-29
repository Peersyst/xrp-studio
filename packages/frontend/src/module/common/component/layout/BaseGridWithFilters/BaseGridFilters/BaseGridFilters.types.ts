import { PaginatedData } from "query-utils";
import { BaseGridWithFilterProps } from "../BaseGridWithFilters.types";

export interface BaseGridFiltersProps<T extends PaginatedData, TagT> {
    children: BaseGridWithFilterProps<T, TagT>["filters"];
}

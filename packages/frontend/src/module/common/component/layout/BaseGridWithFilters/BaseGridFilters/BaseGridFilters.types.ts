import { PaginatedData } from "query-utils";
import { BaseGridWithFilterProps } from "../BaseGridWithFilters.types";

export interface BaseGridFiltersProps<T extends PaginatedData> {
    children: BaseGridWithFilterProps<T>["filters"];
}

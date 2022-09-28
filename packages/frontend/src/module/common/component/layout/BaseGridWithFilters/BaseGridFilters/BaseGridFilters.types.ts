import { PaginatedData } from "query-utils";
import { BaseGridWithFilterProps } from "../BaseGridWithFilters.types";

export interface BaseGridFiltersProps<T extends PaginatedData, TagT> {
    visible?: boolean;
    children: BaseGridWithFilterProps<T, TagT>["filters"];
}

export interface BaseGridFiltersRootProps {
    isHeaderSticky: boolean;
}

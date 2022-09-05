import { PaginatedData } from "query-utils";
import { BaseGridWithFilterProps } from "../BaseGridWithFilters.types";

export type BaseGridFiltersProps<T extends PaginatedData> = Pick<BaseGridWithFilterProps<T>, "filters">;

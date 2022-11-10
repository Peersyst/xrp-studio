import { BaseFiltersNames } from "../../../Filters.types";
import { Filter, FilterTypeName } from "../useFilters.types";

export const TYPE_VALIDATOR: Record<FilterTypeName, (value: string) => boolean> = {
    boolean: (value: string) => value === "true" || value === "false",
    number: (value: string) => !isNaN(Number(value)),
    string: (value: string) => typeof value === "string",
    Date: (value: string) => !isNaN(Date.parse(value)),
};

export const TYPE_PARSER = {
    boolean: Boolean,
    number: Number,
    string: String,
    Date: Date,
};

export const BASE_FILTERS_DECLARATION: Filter[] = [
    {
        name: BaseFiltersNames.QUERY,
    },
    {
        name: BaseFiltersNames.ORDER,
    },
];

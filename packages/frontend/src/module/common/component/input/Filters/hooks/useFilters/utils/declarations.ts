import { BaseFiltersNames, Order } from "module/common/component/input/Filters/Filters.types";
import { Filters } from "../useFilters.types";

export type BaseFilters = {
    [BaseFiltersNames.QUERY]: { type: "string" };
    [BaseFiltersNames.ORDER]: { parser: (value: string) => Order };
};

export const BASE_FILTERS_DECLARATION: Filters = {
    [BaseFiltersNames.QUERY]: { type: "string" },
    [BaseFiltersNames.ORDER]: {
        parser: (value) => {
            if (value !== "ASC" && value !== "DESC") throw new Error("ORDER Filter has invalid type");
            return value;
        },
    },
};

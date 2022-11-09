import { useEffect, useMemo, useState } from "react";
import { createSearchParams, useSearchParams } from "react-router-dom";
import { BaseFiltersNames } from "../Filters.types";

export type FilterType = string | number | boolean | Date;

export type FilterTypeName = "string" | "number" | "boolean" | "Date";

export interface Filter {
    name: string;
    type?: FilterTypeName;
    array?: boolean;
}

export const TYPE_PARSER = {
    boolean: Boolean,
    number: Number,
    string: String,
    Date: Date,
};

export const TYPE_VALIDATOR: Record<FilterTypeName, (value: string) => boolean> = {
    boolean: (value: string) => value === "true" || value === "false",
    number: (value: string) => !isNaN(Number(value)),
    string: (value: string) => typeof value === "string",
    Date: (value: string) => !isNaN(Date.parse(value)),
};

export const BASE_FILTERS_DECLARATION: Filter[] = [
    {
        name: BaseFiltersNames.QUERY,
    },
    {
        name: BaseFiltersNames.ORDER,
    },
];

export type UseFilterReturn = Record<string, FilterType | FilterType[]>;

export function convertValue(value: string, type: FilterTypeName = "string"): FilterType {
    const isValid = TYPE_VALIDATOR[type];
    const parser = TYPE_PARSER[type];

    if (!isValid(value)) throw new Error();
    return parser(value);
}

export default function useFilters(filtersDeclaration: Filter[]): UseFilterReturn {
    const setSearchParams = useSearchParams()[1];
    const [corruptedFilters, setCorruptedFilters] = useState<string[]>();
    const filters = useMemo(() => {
        const params = createSearchParams(window.location.search);
        const newFilters = {} as UseFilterReturn;
        filtersDeclaration.forEach((filter) => {
            try {
                if (filter.array) {
                    const values = params.getAll(filter.name);
                    if (values.length > 0) {
                        const newValues = values.map((value) => {
                            return convertValue(value, filter.type);
                        });
                        newFilters[filter.name] = newValues;
                    }
                } else {
                    const value = params.get(filter.name);
                    if (value) {
                        const newValue = convertValue(value, filter.type);
                        newFilters[filter.name] = newValue;
                    }
                }
            } catch (e) {
                setCorruptedFilters((corruptedNames) => {
                    return [...(corruptedNames || []), filter.name];
                });
            }
        });
        return newFilters;
    }, [window.location.search, filtersDeclaration]);

    useEffect(() => {
        if (corruptedFilters) {
            const params = createSearchParams(window.location.search);
            corruptedFilters.forEach((filterName) => {
                params.delete(filterName);
            });
            setSearchParams(params);
        }
    }, [corruptedFilters]);

    return filters;
}

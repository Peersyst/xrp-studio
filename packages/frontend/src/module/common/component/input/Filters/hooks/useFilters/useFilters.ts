import { useEffect, useMemo, useState } from "react";
import { createSearchParams, useSearchParams } from "react-router-dom";
import { FilterTypeName, FilterType, Filter, UseFilterReturn } from "./useFilters.types";
import { BASE_FILTERS_DECLARATION, TYPE_PARSER, TYPE_VALIDATOR } from "./utils/useFilters.utils";

export function convertValue(value: string, type: FilterTypeName = "string"): FilterType {
    const isValid = TYPE_VALIDATOR[type];
    const parser = TYPE_PARSER[type];

    if (!isValid(value)) throw new Error();
    return parser(value);
}

export default function useFilters(filtersDeclaration: Filter[] = BASE_FILTERS_DECLARATION): UseFilterReturn {
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

    //It is done in a use effect because setSearchParams
    //does a navigate and if there is a corrupted filter in the first render
    //it will navigate on first render and it will cause an error
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

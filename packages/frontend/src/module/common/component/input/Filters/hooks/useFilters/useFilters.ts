import { useEffect, useState } from "react";
import { createSearchParams, useSearchParams } from "react-router-dom";
import { Filters, UseFilterReturn } from "./useFilters.types";
import { BASE_FILTERS_DECLARATION } from "module/common/component/input/Filters/hooks/useFilters/utils/declarations";
import parseValue from "module/common/component/input/Filters/hooks/useFilters/utils/parseValue";

export default function useFilters<FS extends Filters>(
    filtersDeclaration: FS = BASE_FILTERS_DECLARATION as unknown as FS,
): UseFilterReturn<FS> {
    const [params, setSearchParams] = useSearchParams();
    const [corruptedFilters, setCorruptedFilters] = useState<string[]>([]);
    const [filters, setFilters] = useState<UseFilterReturn<FS>>({} as UseFilterReturn<FS>);

    useEffect(() => {
        const newFilters = {} as UseFilterReturn<FS>;
        Object.entries(filtersDeclaration).forEach(([name, filter]) => {
            try {
                if (filter.array) {
                    const values = params.getAll(name);
                    if (values.length > 0) {
                        const newValues = values.map((value) => {
                            return parseValue(value, filter);
                        });
                        newFilters[name as keyof UseFilterReturn<FS>] = newValues as UseFilterReturn<FS>[keyof UseFilterReturn<FS>];
                    }
                } else {
                    const value = params.get(name);
                    if (value) {
                        const newValue = parseValue(value, filter);
                        newFilters[name as keyof UseFilterReturn<FS>] = newValue as UseFilterReturn<FS>[keyof UseFilterReturn<FS>];
                    }
                }
            } catch (e) {
                setCorruptedFilters((corruptedNames) => {
                    return [...corruptedNames, name];
                });
            }
        });
        setFilters(newFilters);
    }, [params, filtersDeclaration]);

    //This is done in a use effect because setSearchParams
    //does a navigate and if there is a corrupted filter in the first render
    //it will navigate on first render and it will cause an error
    useEffect(() => {
        if (corruptedFilters.length) {
            const params = createSearchParams(window.location.search);
            corruptedFilters.forEach((filterName) => {
                params.delete(filterName);
            });
            setSearchParams(params);
            setCorruptedFilters([]);
        }
    }, [corruptedFilters]);

    return filters;
}

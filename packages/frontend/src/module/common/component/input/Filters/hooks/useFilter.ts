import { useCallback } from "react";
import { createSearchParams, useSearchParams } from "react-router-dom";

export type MultipleSelector<T, M extends boolean> = M extends true ? T[] : T;

export interface UseFilterParams<M extends boolean> {
    name: string;
    multiple?: M;
}

export type UseFiltersReturn<T extends string, M extends boolean = false> = [
    MultipleSelector<T, M>,
    (newFilters: MultipleSelector<T, M> | undefined) => void,
];

export default function useFilter<T extends string, M extends boolean = false>({
    name,
    multiple = false as M,
}: UseFilterParams<M>): UseFiltersReturn<T, M> {
    const [params, setSearchParams] = useSearchParams();

    const getCurrentValue = () => {
        if (multiple) {
            return params.getAll(name);
        } else {
            return params.get(name) || "";
        }
    };

    const handleSetFilter = useCallback(
        (value: MultipleSelector<string, M> | undefined) => {
            const newParams = createSearchParams(window.location.search);
            if (!value || value === "" || (Array.isArray(value) && value.length === 0)) {
                newParams.delete(name);
                setSearchParams(newParams);
            } else {
                if (Array.isArray(value)) {
                    const oldValue = newParams.getAll(name);
                    if (value.length > oldValue.length) {
                        newParams.append(name, value[value.length - 1]);
                    } else {
                        newParams.delete(name);
                        value.forEach((v) => newParams.append(name, v));
                    }
                    setSearchParams(newParams);
                } else {
                    newParams.delete(name);
                    newParams.append(name, value);
                    setSearchParams(newParams);
                }
            }
        },
        [setSearchParams, name],
    );

    return [getCurrentValue() as MultipleSelector<T, M>, handleSetFilter];
}

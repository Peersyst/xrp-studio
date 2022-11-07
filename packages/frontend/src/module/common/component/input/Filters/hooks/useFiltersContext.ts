import { useContext } from "react";
import { FiltersContext, FiltersContextType, FilterTypedValue, MultipleSelector } from "../FiltersContext";

export type UseFiltersReturn<T, M extends boolean = false> = [MultipleSelector<T, M>, (newFilters: MultipleSelector<T, M>) => void];

export default function useFiltersContext<S extends string, T>(): FiltersContextType<FilterTypedValue<S, T>> {
    return useContext<FiltersContextType<FilterTypedValue<S, T>>>(FiltersContext);
}

import { useContext } from "react";
import { FiltersContext, MultipleSelector } from "../FiltersContext";

export type UseFiltersReturn<T, M extends boolean = false> = [MultipleSelector<T, M>, (newFilters: MultipleSelector<T, M>) => void];

export default function useFiltersContext<T>() {
    return useContext<T>(FiltersContext);
}

import { FiltersContextType, FilterTypedValue, MultipleSelector } from "../FiltersContext";
import useFiltersContext from "./useFiltersContext";

export type UseFiltersReturn<T, M extends boolean = false> = [MultipleSelector<T, M>, (newFilters: MultipleSelector<T, M>) => void];
export default function useFilters<T, M extends boolean = false>(name: string): UseFiltersReturn<T, M> {
    const { filters, setFilters } = useFiltersContext<FiltersContextType<FilterTypedValue<typeof name, MultipleSelector<T, M>>>>();

    const handleSetFilters = (value: MultipleSelector<T, M>) => {
        setFilters({ ...filters, [name]: value });
    };
    return [filters[name], handleSetFilters];
}

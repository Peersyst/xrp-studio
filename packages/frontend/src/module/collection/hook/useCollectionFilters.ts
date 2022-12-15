import { BASE_FILTERS_DECLARATION, BaseFilters, UseFilterReturn } from "module/common/component/input/Filters/hooks/useFilters";
import useFilters from "module/common/component/input/Filters/hooks/useFilters/useFilters";

export default function useCollectionFilters(): UseFilterReturn<BaseFilters> {
    return useFilters(BASE_FILTERS_DECLARATION);
}

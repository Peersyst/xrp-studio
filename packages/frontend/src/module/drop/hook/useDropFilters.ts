import { BaseFilters, UseFilterReturn } from "module/common/component/input/Filters/hooks/useFilters";
import useFilters from "module/common/component/input/Filters/hooks/useFilters/useFilters";

export default function (): UseFilterReturn<BaseFilters> {
    return useFilters();
}

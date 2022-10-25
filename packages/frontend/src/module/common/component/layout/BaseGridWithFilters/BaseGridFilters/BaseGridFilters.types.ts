import { FiltersProps } from "module/common/component/input/Filters/Filters.types";
import { FiltersBaseContextValue, FiltersContext } from "module/common/component/input/Filters/FiltersContext";

export interface BaseGridFiltersProps<F extends FiltersBaseContextValue> extends FiltersProps {
    filtersContext: FiltersContext<F>;
}

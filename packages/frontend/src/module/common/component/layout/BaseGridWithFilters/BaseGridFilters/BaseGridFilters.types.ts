import { FiltersProps } from "module/common/component/input/Filters/Filters.types";
import { FiltersContext } from "module/common/component/input/Filters/FiltersContext";

export interface BaseGridFiltersProps<F> extends FiltersProps {
    filtersContext: FiltersContext<F>;
}

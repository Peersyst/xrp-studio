import { ExpandableFiltersProps } from "../ExpandableFilters/ExpandableFilters.types";
import { SelectorGroupFilterProps } from "../SelectorGroupFilter/SelectorGroupFilter.types";

export type ExpandableSelectorGroupFiltersProps<T, Name extends string> = Pick<ExpandableFiltersProps, "title"> &
    Omit<SelectorGroupFilterProps<T>, "children" | "options" | "name" | "onChange"> &
    Required<Pick<SelectorGroupFilterProps<T>, "options">> & {
        name: Name;
    };

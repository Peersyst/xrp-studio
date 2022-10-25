import { ExpandableFiltersProps } from "../ExpandableFilters/ExpandableFilters.types";
import { SelectorGroupFilterProps } from "../SelectorGroupFilter/SelectorGroupFilter.types";

export type ExpandableSelectorGroupFiltersProps<T, Name extends string, Multiple extends boolean = false> = Pick<
    ExpandableFiltersProps,
    "title"
> &
    Omit<SelectorGroupFilterProps<T, Multiple>, "children" | "options" | "name" | "onChange"> &
    Required<Pick<SelectorGroupFilterProps<T, Multiple>, "options">> & {
        name: Name;
    };

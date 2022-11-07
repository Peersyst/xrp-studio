import { ExpandableFilterProps } from "../ExpandableFilter/ExpandableFilter.types";
import { SelectorGroupFilterProps } from "../SelectorGroupFilter/SelectorGroupFilter.types";

export type ExpandableSelectorGroupFilterProps<T, Multiple extends boolean = false> = Pick<ExpandableFilterProps, "title"> &
    Omit<SelectorGroupFilterProps<T, Multiple>, "children" | "options"> &
    Required<Pick<SelectorGroupFilterProps<T, Multiple>, "options">>;

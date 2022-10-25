import { SelectorGroupProps } from "@peersyst/react-components";
import { ExpandableFiltersProps } from "../ExpandableFilters/ExpandableFilters.types";

export type ExpandableSelectorGroupFiltersProps<T> = Pick<ExpandableFiltersProps, "title"> &
    Omit<SelectorGroupProps<T>, "children" | "options" | "name"> &
    Required<Pick<SelectorGroupProps<T>, "options" | "name">>;

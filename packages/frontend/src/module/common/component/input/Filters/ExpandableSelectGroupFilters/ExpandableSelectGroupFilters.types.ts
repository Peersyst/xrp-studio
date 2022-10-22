import { SelectGroupProps } from "../../SelectGroup/SelectGroup.types";
import { ExpandableFiltersProps } from "../ExpandableFilters/ExpandableFilters.types";

export type ExpandableSelectGroupFiltersProps<T> = Pick<ExpandableFiltersProps, "title"> &
    Omit<SelectGroupProps<T>, "children" | "options"> &
    Required<Pick<SelectGroupProps<T>, "options">>;

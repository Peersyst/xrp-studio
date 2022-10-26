import { cx } from "@peersyst/react-utils";
import { useMemo } from "react";
import ExpandableFilters from "../ExpandableFilters/ExpandableFilters";
import useFilters from "../hooks/useFilters";
import SelectorGroupFilter from "../SelectorGroupFilter/SelectorGroupFilter";
import { ExpandableSelectorGroupFiltersProps } from "./ExpandableSelectorGroupFilters.types";

function ExpandableSelectorGroupFilters<T, Name extends string, Multiple extends boolean>({
    options,
    title,
    name,
    className,
    ...rest
}: ExpandableSelectorGroupFiltersProps<T, Name, Multiple>): JSX.Element {
    const { filters } = useFilters<Record<Name, Multiple extends true ? T[] : T>>();
    const value = filters[name];
    const currentLabel = useMemo(() => {
        if (Array.isArray(value)) {
            if (value.length === 0) return "";
            return options
                .filter((option) => value.includes(option.value))
                .map((o) => o.label)
                .join(", ");
        } else {
            return options.find((option) => option.value === value)?.label;
        }
    }, [value, options]);

    return (
        <ExpandableFilters className={cx("ExpandableSelectorGroupFilters", className)} title={title} currentValue={currentLabel ?? ""}>
            <SelectorGroupFilter<T, Multiple> name={name} options={options} {...rest} />
        </ExpandableFilters>
    );
}

export default ExpandableSelectorGroupFilters;

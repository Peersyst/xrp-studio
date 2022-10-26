import { cx } from "@peersyst/react-utils";
import { useMemo } from "react";
import ExpandableFilters from "../ExpandableFilters/ExpandableFilters";
import useFilters from "../hooks/useFilters";
import SelectorGroupFilter from "../SelectorGroupFilter/SelectorGroupFilter";
import { ExpandableSelectorGroupFiltersProps } from "./ExpandableSelectorGroupFilters.types";

function ExpandableSelectorGroupFilters<T, Name extends string>({
    options,
    title,
    name,
    className,
    ...rest
}: ExpandableSelectorGroupFiltersProps<T, Name>): JSX.Element {
    const { filters } = useFilters<Record<Name, T>>();
    const value = filters[name];
    const currentLabel = useMemo(() => options.find((option) => option.value === value)?.label, [value, options]);

    return (
        <ExpandableFilters className={cx("ExpandableSelectorGroupFilters", className)} title={title} currentValue={currentLabel ?? ""}>
            <SelectorGroupFilter<T> name={name} options={options} {...rest} />
        </ExpandableFilters>
    );
}

export default ExpandableSelectorGroupFilters;

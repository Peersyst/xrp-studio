import { cx } from "@peersyst/react-utils";
import { useMemo } from "react";
import ExpandableFilter from "../ExpandableFilter/ExpandableFilter";
import useFilter from "../hooks/useFilter/useFilter";
import SelectorGroupFilter from "../SelectorGroupFilter/SelectorGroupFilter";
import { ExpandableSelectorGroupFilterProps } from "./ExpandableSelectorGroupFilter.types";

function ExpandableSelectorGroupFilter<T extends string = "", Multiple extends boolean = false>({
    options,
    title,
    name,
    className,
    multiple = false as Multiple,
    ...rest
}: ExpandableSelectorGroupFilterProps<T, Multiple>): JSX.Element {
    const [value] = useFilter<T, Multiple extends true ? "multiple" : "single", Multiple>(name, {
        multiple,
    });

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
        <ExpandableFilter className={cx("ExpandableSelectorGroupFilter", className)} title={title} currentValue={currentLabel ?? ""}>
            <SelectorGroupFilter<T, Multiple> name={name} options={options} {...rest} multiple={multiple} />
        </ExpandableFilter>
    );
}

export default ExpandableSelectorGroupFilter;

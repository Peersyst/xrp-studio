import { SelectorGroup } from "@peersyst/react-components";
import { cx } from "@peersyst/react-utils";
import { useMemo, useState } from "react";
import ExpandableFilters from "../ExpandableFilters/ExpandableFilters";
import useFilters from "../hooks/useFilters";
import { ExpandableSelectorGroupFiltersProps } from "./ExpandableSelectorGroupFilters.types";

function ExpandableSelectorGroupFilters<T>({
    options,
    title,
    name,
    className,
    ...rest
}: ExpandableSelectorGroupFiltersProps<T>): JSX.Element {
    const [value, setValue] = useState<T>(options[0].value);
    const { setValue: setFilters } = useFilters();
    const currentLabel = useMemo(() => options.find((option) => option.value === value)?.label, [value, options]);

    const handleChange = (value: T) => {
        setValue(value);
        setFilters({ [name]: value });
    };

    return (
        <ExpandableFilters className={cx("ExpandableSelectorGroupFilters", className)} title={title} currentValue={currentLabel ?? ""}>
            <SelectorGroup<T>
                value={value}
                onChange={handleChange}
                selectorLabelProps={{ placement: "left", alignment: "space-between" }}
                options={options}
                {...rest}
            />
        </ExpandableFilters>
    );
}

export default ExpandableSelectorGroupFilters;

import { cx } from "@peersyst/react-utils";
import { useMemo, useState } from "react";
import SelectGroup from "../../SelectGroup/SelectGroup";
import ExpandableFilters from "../ExpandableFilters/ExpandableFilters";
import { ExpandableSelectGroupFiltersProps } from "./ExpandableSelectGroupFilters.types";

function ExpandableSelectGroupFilters<T>({ options, title, name, className, ...rest }: ExpandableSelectGroupFiltersProps<T>): JSX.Element {
    const [value, setValue] = useState<T>(options[0].value);
    const handleChange = (value: T) => {
        setValue(value);
    };
    const currentLabel = useMemo(() => options.find((option) => option.value === value)?.label, [value, options]);
    return (
        <ExpandableFilters className={cx("ExpandableSelectGroupFilters", className)} title={title} currentValue={currentLabel ?? ""}>
            <SelectGroup<T>
                value={value}
                onChange={handleChange}
                selectorLabelProps={{ placement: "left", alignment: "space-between" }}
                options={options}
                {...rest}
            />
        </ExpandableFilters>
    );
}

export default ExpandableSelectGroupFilters;

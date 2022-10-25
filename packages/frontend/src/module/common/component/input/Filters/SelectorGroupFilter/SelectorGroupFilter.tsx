import { SelectorGroup } from "@peersyst/react-components";
import { useControlled } from "@peersyst/react-hooks";
import useFilters from "../hooks/useFilters";
import { SelectorGroupFilterProps } from "./SelectorGroupFilter.types";

function SelectorGroupFilter<T, Multiple extends boolean = false>({
    onChange,
    name,
    value: valueProp,
    defaultValue,
    ...rest
}: SelectorGroupFilterProps<T, Multiple>): JSX.Element {
    const { setValue: setFilters } = useFilters();
    const [value, setValue] = useControlled(defaultValue!, valueProp, onChange);
    const handleChange = (value: Multiple extends true ? T[] : T) => {
        setValue(value);
        setFilters({ [name]: value });
    };

    return <SelectorGroup<T, Multiple> css={{ maxHeight: "14.5rem", overflowY: "auto" }} value={value} onChange={handleChange} {...rest} />;
}

export default SelectorGroupFilter;

import { SelectorGroup } from "@peersyst/react-components";
import { useControlled } from "@peersyst/react-hooks";
import useFilters from "../hooks/useFilters";
import { SelectorGroupFilterProps } from "./SelectorGroupFilter.types";

function SelectorGroupFilter<T>({ onChange, name, value: valueProp, defaultValue, ...rest }: SelectorGroupFilterProps<T>): JSX.Element {
    const { setValue: setFilters } = useFilters();
    const [value, setValue] = useControlled<T>(defaultValue!, valueProp, onChange);
    const handleChange = (value: T) => {
        setValue(value);
        setFilters({ [name]: value });
    };

    return <SelectorGroup value={value} onChange={handleChange} {...rest} />;
}

export default SelectorGroupFilter;

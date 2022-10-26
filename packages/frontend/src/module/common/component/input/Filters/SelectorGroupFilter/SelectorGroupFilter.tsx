import { SelectorGroup } from "@peersyst/react-components";
import useFilters from "../hooks/useFilters";
import { SelectorGroupFilterProps } from "./SelectorGroupFilter.types";

function SelectorGroupFilter<T, Multiple extends boolean = false>({
    onChange,
    name,
    ...rest
}: SelectorGroupFilterProps<T, Multiple>): JSX.Element {
    const { setFilters, filters } = useFilters<Record<string, Multiple extends true ? T[] : T>>();
    const value = filters[name];

    const handleChange = (value: Multiple extends true ? T[] : T) => {
        setFilters({ [name]: value });
        onChange?.(value);
    };

    return <SelectorGroup<T, Multiple> css={{ maxHeight: "14.5rem", overflowY: "auto" }} value={value} onChange={handleChange} {...rest} />;
}

export default SelectorGroupFilter;

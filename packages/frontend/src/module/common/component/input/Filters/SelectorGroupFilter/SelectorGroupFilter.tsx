import { SelectorGroup } from "@peersyst/react-components";
import { MultipleSelector } from "../FiltersContext";
import useFilters from "../hooks/useFilters";
import { SelectorGroupFilterProps } from "./SelectorGroupFilter.types";

function SelectorGroupFilter<T, Multiple extends boolean = false>({
    onChange,
    name,
    ...rest
}: SelectorGroupFilterProps<T, Multiple>): JSX.Element {
    const [filters, setFilters] = useFilters<T, Multiple>(name);

    const handleChange = (value: MultipleSelector<T, Multiple>) => {
        setFilters(value);
        onChange?.(value);
    };

    return (
        <SelectorGroup<T, Multiple> css={{ maxHeight: "14.5rem", overflowY: "auto" }} value={filters} onChange={handleChange} {...rest} />
    );
}

export default SelectorGroupFilter;

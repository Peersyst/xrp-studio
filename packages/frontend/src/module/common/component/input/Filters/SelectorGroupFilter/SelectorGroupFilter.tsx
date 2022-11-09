import { SelectorGroup } from "@peersyst/react-components";
import { MultipleSelector } from "../Filters.types";
import useFilter from "../hooks/useFilter";
import { SelectorGroupFilterProps } from "./SelectorGroupFilter.types";

function SelectorGroupFilter<T extends string, Multiple extends boolean = false>({
    onChange,
    name,
    multiple,
    ...rest
}: SelectorGroupFilterProps<T, Multiple>): JSX.Element {
    const [filter, setFilter] = useFilter<T, Multiple>({ name, multiple });

    const handleChange = (value: MultipleSelector<T, Multiple>) => {
        setFilter(value);
        onChange?.(value);
    };

    return (
        <SelectorGroup<T, Multiple>
            multiple={multiple}
            css={{ maxHeight: "14.5rem", overflowY: "auto" }}
            value={filter}
            onChange={handleChange}
            {...rest}
        />
    );
}

export default SelectorGroupFilter;

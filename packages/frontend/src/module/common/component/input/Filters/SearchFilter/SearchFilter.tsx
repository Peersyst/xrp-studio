import { cx } from "@peersyst/react-utils";
import SearchBar from "../../SearchBar/SearchBar";
import useFilter from "../hooks/useFilter/useFilter";
import { SearchFiltersProps } from "./SearchFilter.types";

function SearchFilter({ name, variant, className, onChange, ...rest }: SearchFiltersProps): JSX.Element {
    const [filter, setFilter] = useFilter(name);

    const handleSearch = (value: string) => {
        setFilter(value);
        onChange?.(value);
    };

    return (
        <SearchBar defaultValue={filter} onChange={handleSearch} className={cx("SearchFilter", className)} variant={variant} {...rest} />
    );
}

export default SearchFilter;

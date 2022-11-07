import { cx } from "@peersyst/react-utils";
import SearchBar from "../../SearchBar/SearchBar";
import useFilters from "../hooks/useFilters";
import { SearchFiltersProps } from "./SearchFilter.types";

function SearchFilter({ name, variant, className, onChange, ...rest }: SearchFiltersProps): JSX.Element {
    const [filters, setFilters] = useFilters<string>(name);
    const handleSearch = (value: string) => {
        setFilters(value);
        onChange?.(value);
    };
    return (
        <SearchBar defaultValue={filters} onChange={handleSearch} className={cx("SearchFilter", className)} variant={variant} {...rest} />
    );
}

export default SearchFilter;

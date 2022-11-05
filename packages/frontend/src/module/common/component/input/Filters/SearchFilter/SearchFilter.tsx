import { cx } from "@peersyst/react-utils";
import SearchBar from "../../SearchBar/SearchBar";
import useFilters from "../hooks/useFilters";
import { SearchFiltersProps } from "./SearchFilter.types";

function SearchFilter<Name extends string>({ name, variant, className, onChange, ...rest }: SearchFiltersProps<Name>): JSX.Element {
    const [filters, setFilters] = useFilters<string, false>(name);
    const handleSearch = (value: string) => {
        setFilters(value);
        onChange?.(value);
    };
    return (
        <SearchBar defaultValue={filters} onChange={handleSearch} className={cx("SearchFilter", className)} variant={variant} {...rest} />
    );
}

export default SearchFilter;

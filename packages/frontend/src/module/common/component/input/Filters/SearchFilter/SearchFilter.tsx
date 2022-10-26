import { cx } from "@peersyst/react-utils";
import SearchBar from "../../SearchBar/SearchBar";
import useFilters from "../hooks/useFilters";
import { SearchFiltersProps } from "./SearchFilter.types";

function SearchFilter<FS extends Record<string, string>>({ name, variant, className, onChange, ...rest }: SearchFiltersProps): JSX.Element {
    const { setFilters, filters } = useFilters<FS>();
    const handleSearch = (value: string) => {
        setFilters({ [name]: value });
        onChange?.(value);
    };

    return (
        <SearchBar
            defaultValue={filters[name]}
            onChange={handleSearch}
            className={cx("SearchFilter", className)}
            variant={variant}
            {...rest}
        />
    );
}

export default SearchFilter;

import { cx } from "@peersyst/react-utils";
import SearchBar from "../../SearchBar/SearchBar";
import useFilter from "../hooks/useFilter/useFilter";
import { SearchFiltersProps } from "./SearchFilter.types";

function SearchFilter({ name, variant, className, onChange, ...rest }: SearchFiltersProps): JSX.Element {
    const setFilters = useFilter<string>(name)[1];
    const handleSearch = (value: string) => {
        setFilters(value);
        onChange?.(value);
    };

    return <SearchBar onChange={handleSearch} className={cx("SearchFilter", className)} variant={variant} {...rest} />;
}

export default SearchFilter;

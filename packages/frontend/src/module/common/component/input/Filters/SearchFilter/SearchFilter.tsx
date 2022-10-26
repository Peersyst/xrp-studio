import { useMediaQuery } from "@peersyst/react-hooks";
import { cx } from "@peersyst/react-utils";
import { useTheme } from "styled-components";
import SearchBar from "../../SearchBar/SearchBar";
import useFilters from "../hooks/useFilters";
import { SearchFiltersProps } from "./SearchFilter.types";

function SearchFilter<FS extends Record<string, string>>({ name, variant, className, ...rest }: SearchFiltersProps): JSX.Element {
    const {
        breakpoints: {
            values: { nftsGrid },
        },
    } = useTheme();
    const isTablet = useMediaQuery(`(max-width: ${nftsGrid.sm}px)`);
    const { setFilters, filters } = useFilters<FS>();
    const handleSearch = (value: string) => setFilters({ [name]: value });

    return (
        <SearchBar
            defaultValue={filters[name]}
            onChange={handleSearch}
            className={cx("SearchFilter", className)}
            variant={variant || isTablet ? "filled" : "cardfilled"}
            {...rest}
        />
    );
}

export default SearchFilter;

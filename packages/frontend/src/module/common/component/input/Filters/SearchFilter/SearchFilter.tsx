import { useMediaQuery } from "@peersyst/react-hooks";
import { cx } from "@peersyst/react-utils";
import { useTheme } from "styled-components";
import SearchBar from "../../SearchBar/SearchBar";
import useFilters from "../hooks/useFilters";
import { SearchFiltersProps } from "./SearchFilter.types";

const SearchFilter = ({ name, variant, className, ...rest }: SearchFiltersProps): JSX.Element => {
    const {
        breakpoints: {
            values: { nftsGrid },
        },
    } = useTheme();
    const isTablet = useMediaQuery(`(max-width: ${nftsGrid.sm}px)`);
    const { setValue } = useFilters();
    const handleSearch = (value: string) => setValue({ [name]: value });

    return (
        <SearchBar
            onChange={handleSearch}
            className={cx("SearchFilter", className)}
            variant={variant || isTablet ? "filled" : "cardfilled"}
            {...rest}
        />
    );
};

export default SearchFilter;

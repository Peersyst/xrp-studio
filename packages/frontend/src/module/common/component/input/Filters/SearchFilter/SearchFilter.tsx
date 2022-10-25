import { useMediaQuery } from "@peersyst/react-hooks";
import { cx } from "@peersyst/react-utils";
import { useTheme } from "styled-components";
import SearchBar from "../../SearchBar/SearchBar";
import { SearchBarProps } from "../../SearchBar/SearchBar.types";
import useFilters from "../hooks/useFilters";

const SearchFilter = ({ name = "query", variant, className, ...rest }: SearchBarProps): JSX.Element => {
    const {
        breakpoints: {
            values: { nftsGrid },
        },
    } = useTheme();
    const isTablet = useMediaQuery(`(max-width: ${nftsGrid.sm}px)`);
    const { setValue } = useFilters();
    const handleSearch = (value: string) => {
        setValue({ [name]: value });
    };

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

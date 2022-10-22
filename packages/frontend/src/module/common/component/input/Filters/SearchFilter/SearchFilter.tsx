import { useMediaQuery } from "@peersyst/react-hooks";
import { cx } from "@peersyst/react-utils";
import { useTheme } from "styled-components";
import SearchBar from "../../SearchBar/SearchBar";
import { SearchBarProps } from "../../SearchBar/SearchBar.types";

const SearchFilter = ({ name = "query", variant, className, ...rest }: SearchBarProps): JSX.Element => {
    const {
        breakpoints: {
            values: { nftsGrid },
        },
    } = useTheme();
    const isTablet = useMediaQuery(`(max-width: ${nftsGrid.sm}px)`);

    return <SearchBar className={cx("SearchFilter", className)} variant={variant || isTablet ? "filled" : "cardfilled"} {...rest} />;
};

export default SearchFilter;

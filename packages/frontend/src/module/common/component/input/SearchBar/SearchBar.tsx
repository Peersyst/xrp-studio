import { LoaderIcon } from "@peersyst/react-components";
import { cx, debounce } from "@peersyst/react-utils";
import useTranslate from "module/common/hook/useTranslate";
import SearchIcon from "module/common/icons/SearchIcon";
import { useRef, useState } from "react";
import TextField from "../TextField/TextField";
import { SearchBarProps } from "./SearchBar.types";

const SearchBar = ({ loading = false, className, variant = "filled", size = "md", onChange, ...rest }: SearchBarProps): JSX.Element => {
    const [query, setQuery] = useState<string>();
    const t = useTranslate();
    const handleChange = (q: string) => {
        setQuery(q);
        changeQuery(q);
    };
    const changeQuery = useRef(
        debounce((q: string) => {
            onChange?.(q);
        }, 600),
    ).current;
    return (
        <TextField
            className={cx("search-bar", className)}
            value={query}
            placeholder={t("search")}
            onChange={handleChange}
            size={size}
            suffix={loading ? <LoaderIcon /> : <SearchIcon />}
            {...rest}
            variant={variant}
        />
    );
};

export default SearchBar;

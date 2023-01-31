import { LoaderIcon } from "@peersyst/react-components";
import { cx } from "@peersyst/react-utils";
import useTranslate from "module/common/hook/useTranslate";
import SearchIcon from "module/common/icons/SearchIcon";
import TextField from "../TextField/TextField";
import { SearchBarProps } from "./SearchBar.types";
import { useDebounce } from "@peersyst/react-hooks";

const SearchBar = ({
    loading: loadingProp = false,
    showLoading = true,
    className,
    variant = "filled",
    size = "md",
    onChange: onSearch,
    defaultValue = "",
    ...rest
}: SearchBarProps): JSX.Element => {
    const t = useTranslate();
    const { value, handleChange, debouncing } = useDebounce(defaultValue, { callback: onSearch });

    return (
        <TextField
            className={cx("search-bar", className)}
            value={value}
            placeholder={t("search")}
            onChange={handleChange}
            size={size}
            suffix={showLoading && (loadingProp || debouncing) ? <LoaderIcon /> : <SearchIcon />}
            {...rest}
            variant={variant}
        />
    );
};

export default SearchBar;

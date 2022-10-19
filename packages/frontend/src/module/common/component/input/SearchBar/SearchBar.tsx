import { LoaderIcon } from "@peersyst/react-components";
import { cx } from "@peersyst/react-utils";
import { useDebounce } from "module/common/hook/useDebounce/useDebounce";
import useTranslate from "module/common/hook/useTranslate";
import SearchIcon from "module/common/icons/SearchIcon";
import TextField from "../TextField/TextField";
import { SearchBarProps } from "./SearchBar.types";

const SearchBar = ({
    loading: loadingProp = false,
    showLoading = true,
    className,
    variant = "filled",
    size = "md",
    onChange: onSearch,
    ...rest
}: SearchBarProps): JSX.Element => {
    const t = useTranslate();
    const { value, onChange, loading } = useDebounce({ onQuery: onSearch });

    return (
        <TextField
            className={cx("search-bar", className)}
            value={value}
            placeholder={t("search")}
            onChange={onChange}
            size={size}
            suffix={showLoading && (loadingProp || loading) ? <LoaderIcon /> : <SearchIcon />}
            {...rest}
            variant={variant}
        />
    );
};

export default SearchBar;

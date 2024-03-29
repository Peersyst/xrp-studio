import { TextFieldProps } from "../TextField/TextField.types";

export interface SearchBarProps extends Omit<TextFieldProps, "suffix" | "value"> {
    /**
     * The SearchBar is loading
     */
    loading?: boolean;
    /**
     * Should the SearchBar show loading
     */
    showLoading?: boolean;
}

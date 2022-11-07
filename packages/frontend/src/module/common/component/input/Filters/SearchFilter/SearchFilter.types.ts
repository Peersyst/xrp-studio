import { SearchBarProps } from "../../SearchBar/SearchBar.types";

export interface SearchFiltersProps extends Omit<SearchBarProps, "name" | "defaultValue"> {
    /**
     * The name of the search input
     * */
    name: string;
}

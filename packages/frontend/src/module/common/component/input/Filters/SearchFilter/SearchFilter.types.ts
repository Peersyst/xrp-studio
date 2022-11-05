import { SearchBarProps } from "../../SearchBar/SearchBar.types";

export interface SearchFiltersProps<Name extends string> extends Omit<SearchBarProps, "name" | "defaultValue"> {
    /**
     * The name of the search input
     * */
    name: string;
}

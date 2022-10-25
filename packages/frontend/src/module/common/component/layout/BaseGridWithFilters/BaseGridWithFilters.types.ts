import { GridProps } from "@peersyst/react-components";
import { PaginatedData } from "query-utils";
import { FiltersBaseContextValue } from "../../input/Filters/FiltersContext";
import { BaseGridProps } from "../BaseGrid/BaseGrid.types";
import { BaseGridFiltersProps } from "./BaseGridFilters/BaseGridFilters.types";
import { BaseGridTagsProps } from "./BaseGridTags/BaseGridTags.types";

export interface BaseGridWithFilterProps<T extends PaginatedData, TagT, F extends FiltersBaseContextValue> extends BaseGridProps<T> {
    filterBreakpoints?: GridProps["breakpoints"];
    filters: BaseGridFiltersProps<F>["children"];
    filtersContext: BaseGridFiltersProps<F>["filtersContext"];
    tags?: BaseGridTagsProps<TagT>["tags"];
    showTags?: boolean;
    onTagClicked?: BaseGridTagsProps<TagT>["onTagClicked"];
    onClearTags?: BaseGridTagsProps<TagT>["onClear"];
}

export interface GridWrapperProps {
    isOpen: boolean;
}

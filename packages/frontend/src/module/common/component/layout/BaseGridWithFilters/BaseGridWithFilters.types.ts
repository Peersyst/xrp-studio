import { GridProps } from "@peersyst/react-components";
import { PaginatedData } from "query-utils";
import { BaseGridProps } from "../BaseGrid/BaseGrid.types";
import { BaseGridFiltersProps } from "./BaseGridFilters/BaseGridFilters.types";
import { BaseGridTagsProps } from "./BaseGridTags/BaseGridTags.types";

export interface BaseGridWithFilterProps<T extends PaginatedData, TagT = any> extends BaseGridProps<T> {
    filterBreakpoints?: GridProps["breakpoints"];
    filters: BaseGridFiltersProps["children"];
    tags?: BaseGridTagsProps<TagT>["tags"];
    onTagClicked?: BaseGridTagsProps<TagT>["onTagClicked"];
    onClearTags?: BaseGridTagsProps<TagT>["onClear"];
}

export interface GridWrapperProps {
    isOpen: boolean;
}

import { GridProps } from "@peersyst/react-components";
import { PaginatedData } from "query-utils";
import { ReactElement } from "react";
import { BaseGridProps } from "../BaseGrid/BaseGrid.types";
import { BaseGridTagsProps } from "./BaseGridTags/BaseGridTags.types";

export interface BaseGridWithFilterProps<T extends PaginatedData, TagT> extends Omit<BaseGridProps<T>, "moveGrid"> {
    filterBreakpoints?: GridProps["breakpoints"];
    filters: ReactElement;
    tags?: BaseGridTagsProps<TagT>["tags"];
    onTagClicked?: BaseGridTagsProps<TagT>["onTagClicked"];
    onClearTags?: BaseGridTagsProps<TagT>["onClear"];
}

export interface GridWrapperProps {
    isOpen: boolean;
}

import { GridProps } from "@peersyst/react-components";
import { PaginatedData } from "query-utils";
import { ReactElement } from "react";
import { BaseGridProps } from "../BaseGrid/BaseGrid.types";
import { BaseGridTagsProps } from "./BaseGridTags/BaseGridTags.types";

export interface BaseGridWithFilterProps<T extends PaginatedData> extends Omit<BaseGridProps<T>, "moveGrid"> {
    filterBreakpoints?: GridProps["breakpoints"];
    filters: ReactElement;
    tags?: BaseGridTagsProps["children"];
}

export interface GridWrapperProps {
    isOpen: boolean;
}

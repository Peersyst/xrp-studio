import { PaginatedNftDto } from "module/api/service";
import { FiltersBaseContextValue } from "module/common/component/input/Filters/FiltersContext";
import { GridProps } from "module/common/component/layout/Grid/Grid.types";

export type CollectionId = number;

export type NftGridProps<F extends FiltersBaseContextValue> = Omit<
    GridProps<PaginatedNftDto, CollectionId, F>,
    "children" | "Skeletons" | "breakpoints" | "filterBreakpoints" | "filters"
>;

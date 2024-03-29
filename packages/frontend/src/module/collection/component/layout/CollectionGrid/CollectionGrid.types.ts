import { PaginatedCollectionDto } from "module/api/service";
import { GridProps } from "module/common/component/layout/Grid/Grid.types";

export type CollectionGridProps = Omit<
    GridProps<PaginatedCollectionDto, any>,
    "children" | "Skeletons" | "breakpoints" | "filterBreakpoints" | "filters"
>;

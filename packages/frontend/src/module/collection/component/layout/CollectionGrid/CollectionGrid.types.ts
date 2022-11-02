import { PaginatedCollectionDto } from "module/api/service";
import { GridProps } from "module/common/component/layout/Grid/Grid.types";

export type CollectionGridProps<TagT> = Omit<
    GridProps<PaginatedCollectionDto, TagT>,
    "children" | "Skeletons" | "breakpoints" | "filterBreakpoints" | "filters"
>;

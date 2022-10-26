import { CollectionDto, PaginatedNftDto } from "module/api/service";
import { GridProps } from "module/common/component/layout/Grid/Grid.types";
import { SelectorOption } from "@peersyst/react-components-core";

export type CollectionId = number;

export type NftCollectionTag = SelectorOption<CollectionId>;

export type NftGridProps = Omit<
    GridProps<PaginatedNftDto, CollectionId>,
    "children" | "Skeletons" | "breakpoints" | "filterBreakpoints" | "filters" | "tags" | "filtersContext"
> & {
    collections?: CollectionDto[];
};

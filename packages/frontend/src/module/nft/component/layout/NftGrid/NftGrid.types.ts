import { CollectionDto, PaginatedNftDto } from "module/api/service";
import { GridProps } from "module/common/component/layout/Grid/Grid.types";
import { SelectorOption } from "@peersyst/react-components-core";

export type CollectionId = number;

export type NftCollectionTag = SelectorOption<string>;

export type NftGridProps = Omit<
    GridProps<PaginatedNftDto, string>,
    "children" | "Skeletons" | "breakpoints" | "filterBreakpoints" | "filters" | "tags" | "filtersContext" | "loading" | "showFilters"
> & {
    collections?: CollectionDto[];
    loadingNfts: boolean;
    loadingCollections?: boolean;
};

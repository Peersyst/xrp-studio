import { CollectionDto, PaginatedNftDto } from "module/api/service";
import { GridProps } from "module/common/component/layout/Grid/Grid.types";
import { UseGetNftsOptions } from "module/nft/query/useGetNfts";

export type CollectionId = number;

export type NftGridProps = Omit<
    GridProps<PaginatedNftDto, CollectionId, UseGetNftsOptions>,
    "children" | "Skeletons" | "breakpoints" | "filterBreakpoints" | "filters" | "tags"
> & {
    collections?: CollectionDto[];
};

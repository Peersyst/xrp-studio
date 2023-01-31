import { CollectionDto, NftDraftDto, NftDto, PaginatedNftDraftDto, PaginatedNftDto } from "module/api/service";
import { GridProps } from "module/common/component/layout/Grid/Grid.types";
import { SelectorOption } from "@peersyst/react-components-core";
import { Common } from "@peersyst/react-types";

export type CollectionId = number;

export type NftCollectionTag = SelectorOption<string>;

export type NftGridProps = Omit<
    GridProps<PaginatedNftDto | PaginatedNftDraftDto, string>,
    "children" | "Skeletons" | "breakpoints" | "filterBreakpoints" | "filters" | "tags" | "filtersContext" | "loading" | "showFilters"
> & {
    collections?: CollectionDto[];
    loadingNfts: boolean;
    loadingCollections?: boolean;
    withExtraSpace?: boolean;
    link?: ((nft: Common<NftDto, NftDraftDto>, i: number) => string) | boolean;
};

export type InnerNftGridProps = Omit<GridProps<PaginatedNftDto | PaginatedNftDraftDto, string>, "Skeletons" | "children" | "breakpoints"> &
    Pick<NftGridProps, "link">;

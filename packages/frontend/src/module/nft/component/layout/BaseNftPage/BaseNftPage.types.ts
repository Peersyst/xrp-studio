import { ReactElement } from "react";
import { CollectionDto, NftDto } from "module/api/service";
import { NftPreviewCarouselProps } from "module/nft/component/display/NftPreviewCarousel/NftPreviewCarousel.types";

export interface BaseNftPageProps {
    header: ReactElement;
    nft: NftDto | undefined;
    collectionNfts?: NftDto[];
    collectionNftLink?: NftPreviewCarouselProps["to"];
    collections?: CollectionDto[];
    loadingNft?: boolean;
    loadingCollectionNfts?: boolean;
    readonly?: boolean;
    fixedCollection?: boolean;
}

export type BaseNftPageContentProps = Omit<BaseNftPageProps, "header">;

export type BaseNftPageFormProps = Pick<BaseNftPageProps, "nft" | "collections" | "readonly" | "fixedCollection"> & {
    loading?: boolean;
};

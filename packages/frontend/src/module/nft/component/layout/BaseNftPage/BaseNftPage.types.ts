import { ReactElement } from "react";
import { CollectionDto } from "module/api/service";
import { NftPreviewCarouselProps } from "module/nft/component/display/NftPreviewCarousel/NftPreviewCarousel.types";
import { Nft } from "module/nft/types";

export interface BaseNftPageProps {
    header: ReactElement;
    nft?: Nft | undefined;
    collectionNfts?: Nft[];
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

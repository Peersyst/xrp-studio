import { ReactElement, ReactNode } from "react";
import { NftPreviewCarouselProps } from "module/nft/component/display/NftPreviewCarousel/NftPreviewCarousel.types";
import { Nft } from "module/nft/types";

export interface BaseNftPageChildren {
    header: ReactElement;
    content: ReactNode;
}

export interface BaseNftPageProps {
    collectionNfts?: Nft[];
    collectionNftLink?: NftPreviewCarouselProps["to"];
    loadingCollectionNfts?: boolean;
    activeCarouselNftId?: number;
    children: BaseNftPageChildren;
}

export type BaseNftPageFormProps = {
    loading?: boolean;
};

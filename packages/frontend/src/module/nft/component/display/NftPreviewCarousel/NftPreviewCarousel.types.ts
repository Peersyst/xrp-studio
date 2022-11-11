import { CSSProperties } from "react";
import { Nft } from "module/nft/types";

export interface NftPreviewCarouselProps {
    nfts: Nft[];
    loading?: boolean;
    activeId?: number;
    to?: (nft: Nft, index: number) => string;
    className?: string;
    style?: CSSProperties;
}

export interface NftPreviewCarouselItemProps {
    active: boolean;
    isLink: boolean;
}

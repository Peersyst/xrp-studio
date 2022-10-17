import { NftDto } from "module/api/service";
import { CSSProperties } from "react";

export interface NftPreviewCarouselProps {
    nfts: NftDto[];
    loading?: boolean;
    to?: (nft: NftDto) => string;
    className?: string;
    style?: CSSProperties;
}

import { PreviewNft } from "module/nft/types";
import { CSSProperties } from "react";

export interface NftsPreviewListProps {
    nfts: PreviewNft[];
    className?: string;
    style?: CSSProperties;
}

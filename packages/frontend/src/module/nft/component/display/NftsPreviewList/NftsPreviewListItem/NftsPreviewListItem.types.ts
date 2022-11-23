import { PreviewNft } from "module/nft/types";
import { CSSProperties } from "react";

export interface NftsPreviewListItemProps {
    nft: PreviewNft;
    className?: string;
    style?: CSSProperties;
}

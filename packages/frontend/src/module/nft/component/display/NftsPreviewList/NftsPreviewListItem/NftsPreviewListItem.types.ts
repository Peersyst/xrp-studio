import { PreviewNft } from "module/nft/types";
import { CSSProperties } from "react";

export interface NftsPreviewListItemProps {
    nft: PreviewNft | undefined;
    loading?: boolean;
    className?: string;
    style?: CSSProperties;
}

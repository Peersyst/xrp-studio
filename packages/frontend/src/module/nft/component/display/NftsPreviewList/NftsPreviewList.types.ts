import { PreviewNft } from "module/nft/types";
import { CSSProperties } from "react";

export interface NftsPreviewListProps {
    nfts: PreviewNft[] | undefined;
    loading?: boolean;
    className?: string;
    style?: CSSProperties;
}

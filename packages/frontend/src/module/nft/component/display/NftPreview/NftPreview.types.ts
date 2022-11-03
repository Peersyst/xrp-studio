import { CSSProperties } from "react";
import { Nft } from "module/nft/types";

export interface NftPreviewProps {
    nft: Nft | undefined;
    to?: string;
    loading?: boolean;
    className?: string;
    style?: CSSProperties;
}

import { Nft } from "module/nft/types";
import { CSSProperties } from "react";

export interface NftCardProps {
    nft: Nft;
    className?: string;
    style?: CSSProperties;
}

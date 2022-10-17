import { NftDto } from "module/api/service";
import { CSSProperties } from "react";

export interface NftPreviewProps {
    nft: NftDto | undefined;
    to?: string;
    loading?: boolean;
    className?: string;
    style?: CSSProperties;
}

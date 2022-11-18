import { NftDraftDto, NftDto } from "module/api/service";
import { CSSProperties } from "react";

export interface NftCardProps {
    nft: NftDto | NftDraftDto;
    className?: string;
    style?: CSSProperties;
}

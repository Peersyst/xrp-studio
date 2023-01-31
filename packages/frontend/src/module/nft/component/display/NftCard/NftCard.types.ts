import { CSSProperties } from "react";
import { NftDraftDto, NftDto } from "module/api/service";

export interface NftCardProps {
    nft: NftDto | NftDraftDto;
    readonly?: boolean;
    className?: string;
    style?: CSSProperties;
}

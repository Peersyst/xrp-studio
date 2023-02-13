import { NftDto } from "module/api/service";
import { CSSProperties } from "react";

export interface LandingPageNftsSectionProps {
    nfts: NftDto[] | undefined;
    loading?: boolean;
    className?: string;
    style?: CSSProperties;
}

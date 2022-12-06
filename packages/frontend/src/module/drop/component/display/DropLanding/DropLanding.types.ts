import { DropDto, NftDto } from "module/api/service";
import { CSSProperties } from "react";
import { Loosen } from "@peersyst/react-types";

export interface DropLandingProps {
    drop?: Loosen<DropDto, "id">;
    nfts: NftDto[] | undefined;
    loadingNfts?: boolean;
    preview?: boolean;
    className?: string;
    style?: CSSProperties;
}

export type DropLandingRootProps = {
    preview: boolean;
};

export type DropLandingContentProps = {
    preview: boolean;
};

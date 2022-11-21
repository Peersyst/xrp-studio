import { DropDto, FaqsDto, NftDto } from "module/api/service";
import { CSSProperties } from "react";
import { Loosen } from "@peersyst/react-types";

export interface DropLandingProps {
    // TODO: Add sold to DropDto
    drop: Loosen<Omit<DropDto, "faqs">, "id"> & { faqs: Array<Loosen<FaqsDto, "id">>; sold?: number };
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

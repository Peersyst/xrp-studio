import { DropDto, NftDto } from "module/api/service";
import { CSSProperties } from "react";
import { Loosen } from "@peersyst/react-types";
import { Faq } from "module/drop/types";

export interface DropLandingProps {
    // TODO: Add sold to DropDto
    drop: Loosen<Omit<DropDto, "faqs">, "id"> & { faqs: Array<Faq>; sold?: number };
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

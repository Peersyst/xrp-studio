import { DropDto } from "module/api/service";
import { CSSProperties } from "react";
import { Loosen } from "@peersyst/react-types";

export interface DropLandingProps {
    // TODO: Add sold to DropDto
    drop: Loosen<DropDto, "id"> & { sold?: number };
    loading?: boolean;
    preview?: boolean;
    className?: string;
    style?: CSSProperties;
}

export type DropLandingContentProps = {
    preview: boolean;
};

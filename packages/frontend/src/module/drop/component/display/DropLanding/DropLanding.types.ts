import { DropDto } from "module/api/service";
import { CSSProperties } from "react";
import { PreviewDrop } from "module/drop/types";

export interface DropLandingProps<P extends boolean = false> {
    drop: P extends false ? DropDto : PreviewDrop;
    loading?: boolean;
    preview?: P;
    className?: string;
    style?: CSSProperties;
}

export type DropLandingContentProps = {
    preview: boolean;
};

import { CSSProperties } from "react";

export interface DropLandingVideoSectionProps {
    videoUrl: string | undefined;
    loading?: boolean;
    className?: string;
    style?: CSSProperties;
}

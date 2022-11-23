import { CSSProperties } from "react";

export interface DropLandingFooterSectionProps {
    networks: { instagram?: string; twitter?: string; discord?: string };
    loading?: boolean;
    className?: string;
    style?: CSSProperties;
}

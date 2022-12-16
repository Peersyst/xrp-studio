import { ItemHowWork } from "module/landing/Landing.types";
import { CSSProperties } from "react";

export interface LandingPageHowWorkSectionProps {
    items: ItemHowWork[];
    loading?: boolean;
    className?: string;
    style?: CSSProperties;
}

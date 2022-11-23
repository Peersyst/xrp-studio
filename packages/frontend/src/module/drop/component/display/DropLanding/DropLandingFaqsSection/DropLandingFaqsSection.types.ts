import { CSSProperties } from "react";
import { Faq } from "module/drop/types";

export interface DropLandingFaqsSectionProps {
    faqs: Faq[];
    className?: string;
    style?: CSSProperties;
}

import { CSSProperties } from "react";
import { Faq } from "module/drop/types";

export interface DropFaqProps {
    faq: Faq;
    className?: string;
    style?: CSSProperties;
}

import { FaqsDto } from "module/api/service";
import { CSSProperties } from "react";

export interface DropLandingFaqsSectionProps {
    faqs?: FaqsDto[];
    className?: string;
    style?: CSSProperties;
    loading?: boolean;
}

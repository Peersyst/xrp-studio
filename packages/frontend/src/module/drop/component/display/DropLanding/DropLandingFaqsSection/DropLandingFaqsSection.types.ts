import { Loosen } from "@peersyst/react-types";
import { FaqsDto } from "module/api/service";
import { CSSProperties } from "react";

export interface DropLandingFaqsSectionProps {
    faqs: Loosen<FaqsDto, "id">[];
    className?: string;
    style?: CSSProperties;
}

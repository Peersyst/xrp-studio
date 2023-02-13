import { DropDto } from "module/api/service";
import { CSSProperties } from "react";

export interface LandingPageDropsSectionProps {
    drops: DropDto[] | undefined;
    loading?: boolean;
    className?: string;
    style?: CSSProperties;
}

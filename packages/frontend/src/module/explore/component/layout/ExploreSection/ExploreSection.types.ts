import { CSSProperties, ReactNode } from "react";

export interface ExploreSectionProps {
    title: string;
    viewMoreLink?: string;
    loading?: boolean;
    children: ReactNode;
    style?: CSSProperties;
    className?: string;
}

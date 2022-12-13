import { CSSProperties, ReactNode } from "react";

export interface BaseCardProps {
    coverUrl: string | undefined;
    defaultCoverUrl: string;
    title?: string;
    titlePlaceholder?: string;
    note?: string;
    to?: string;
    children?: ReactNode;
    status?: ReactNode;
    onDeleteClicked?: () => void;
    className?: string;
    style?: CSSProperties;
}

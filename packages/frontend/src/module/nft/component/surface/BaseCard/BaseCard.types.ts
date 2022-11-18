import { CSSProperties, ReactNode } from "react";

export interface BaseCardProps {
    coverUrl?: string;
    defaultUrl?: string;
    title: string;
    note?: string;
    to?: string;
    children?: ReactNode;
    status?: ReactNode;
    onDeleteClicked?: () => void;
    className?: string;
    style?: CSSProperties;
}

export interface CoverProps {
    imageUrl?: string;
}

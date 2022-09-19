import { ReactNode } from "react";

export interface BaseCardProps {
    coverUrl?: string;
    defaultUrl: string;
    title: string;
    note?: string;
    to: string;
    children?: ReactNode;
}

export interface CoverProps {
    imageUrl?: string;
}

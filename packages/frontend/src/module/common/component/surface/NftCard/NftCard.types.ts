import { CSSProperties, ReactNode } from "react";

export interface NftCardProps {
    id: number;
    title: string;
    price: number;
    collection?: string;
    background?: ReactNode;
    className?: string;
    style?: CSSProperties;
}

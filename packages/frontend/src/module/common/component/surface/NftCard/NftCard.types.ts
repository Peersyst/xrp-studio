import { CSSProperties, ReactNode } from "react";

export interface NftCardProps {
    title: string;
    price: number;
    collection?: string;
    cover?: ReactNode;
    className?: string;
    style?: CSSProperties;
}

import { CSSProperties, ReactNode } from "react";

export interface NftCardProps {
    id: number;
    title: string;
    collection: string;
    image: string;
    backgroundColor: string;
    price: number;
    background?: ReactNode;
    className?: string;
    style?: CSSProperties;
}

import { CSSProperties, ReactNode } from "react";

export type CardType = "nft" | "collection";

export interface BaseCardProps {
    type: CardType;
    id?: number;
    price?: number;
    title?: string;
    collection?: string;
    background?: ReactNode;
    loading?: boolean;
    className?: string;
    style?: CSSProperties;
}

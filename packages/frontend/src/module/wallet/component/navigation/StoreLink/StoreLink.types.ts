import { CSSProperties } from "react";

export type StoreType = "appStore" | "playStore";

export interface StoreLink {
    image: string;
    url: string;
    alt: string;
}

export type StoreLinksType = Record<StoreType, StoreLink>;

export interface StoreLinkProps {
    /**
     * Store type: "appStore" or "playStore"
     */
    type: StoreType;
    /**
     * ClassName
     */
    className?: string;
    /**
     * Style
     */
    style?: CSSProperties;
}

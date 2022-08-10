import { CSSProperties } from "react";

export type StoreType = "appStore" | "playStore";

export type StoreLinksType = Record<StoreType, string>;

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

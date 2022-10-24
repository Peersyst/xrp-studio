import { CSSProperties } from "react";

export interface ConnectedDotProps {
    /**
     * Set active to true if you want the dot to be active
     */
    active?: boolean;
    /**
     * connected dot classname
     */
    className?: string;
    /**
     * style
     */
    style?: CSSProperties;
}

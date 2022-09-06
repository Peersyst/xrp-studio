import { ReactNode } from "react";

export interface BaseGridTagsProps {
    /**
     * The tags to display
     */
    children?: ReactNode[];
    /**
     * Clear tags fn
     */
    onClear?: () => void;
}

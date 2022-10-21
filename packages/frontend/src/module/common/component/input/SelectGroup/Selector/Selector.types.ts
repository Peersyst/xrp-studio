import { LabelProps } from "@peersyst/react-components";
import { CSSProperties } from "react";
import { CoreSelectorProps } from "../../CoreSelectGroup/CoreSelectGroup.types";

export interface SelectorProps<T> extends CoreSelectorProps<T, LabelProps> {
    /**
     * Selector className
     */
    className?: string;
    /**
     * Selector style
     */
    style?: CSSProperties;
}

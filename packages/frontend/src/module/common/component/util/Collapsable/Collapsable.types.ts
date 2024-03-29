import { CollapseProps } from "@peersyst/react-components";
import { CSSProperties } from "react";

export interface CollapsableProps extends Omit<CollapseProps, "in" | "orientation" | "collapsedSize"> {
    defaultCollapsed?: boolean;
    collapse?: boolean;
    onChange?: (collapsed: boolean) => void;
    label?: string;
    collapsedLabel?: string;
    className?: string;
    style?: CSSProperties;
}

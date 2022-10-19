import { CollapseProps } from "@peersyst/react-components";

export interface CollapsableProps extends Omit<CollapseProps, "in" | "orientation" | "collapsedSize"> {
    defaultCollapsed?: boolean;
    collapse?: boolean;
    onChange?: (collapsed: boolean) => void;
    label?: string;
    collapsedLabel?: string;
}

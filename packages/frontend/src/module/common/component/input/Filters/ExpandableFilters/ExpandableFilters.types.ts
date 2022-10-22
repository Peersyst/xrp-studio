import { ExpandableProps } from "@peersyst/react-components";
import { ReactElement } from "react";

export interface ExpandableFiltersProps extends Omit<ExpandableProps, "children"> {
    children: ReactElement;
    title: string;
    currentValue: string | number;
    loading?: boolean;
    loadingText?: string;
}

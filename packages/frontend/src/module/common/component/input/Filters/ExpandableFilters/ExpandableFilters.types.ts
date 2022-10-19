import { CSSProperties, ReactElement } from "react";

export interface ExpandableFiltersProps {
    children: ReactElement[];
    title: string;
    currentValue: string | number;
    className?: string;
    style?: CSSProperties;
}

import { CSSProperties, ReactElement } from "react";
import { ArrowButtonProps } from "../../input/ArrowButton/ArrowButton.types";

export interface BasePageHeaderProps {
    back?: boolean;
    backIconSize?: ArrowButtonProps["size"];
    title: string;
    subtitle?: string;
    complement?: ReactElement;
    footer?: ReactElement;
    className?: string;
    style?: CSSProperties;
}

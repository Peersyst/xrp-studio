import { CSSProperties, ReactElement } from "react";
import { ArrowButtonProps } from "../../input/ArrowButton/ArrowButton.types";
import { PageHeaderProps } from "../PageHeader/PageHeader";

export interface MainPageHeaderProps extends Pick<PageHeaderProps, "stickyTitle"> {
    back?: boolean;
    backIconSize?: ArrowButtonProps["size"];
    backPath?: string;
    title?: string;
    subtitle?: string;
    complement?: ReactElement;
    footer?: ReactElement;
    className?: string;
    style?: CSSProperties;
}

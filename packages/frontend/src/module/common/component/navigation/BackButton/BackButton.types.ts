import { CSSProperties } from "react";
import { ArrowButtonProps } from "../../input/ArrowButton/ArrowButton.types";

export interface BackButtonProps {
    className?: string;
    style?: CSSProperties;
}

export type BackButtonOnClick = ArrowButtonProps["onClick"];

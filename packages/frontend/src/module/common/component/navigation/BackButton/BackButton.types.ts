import { ArrowButtonProps } from "./../../input/ArrowButton/ArrowButton.types";

export type BackButtonProps = Omit<ArrowButtonProps, "children" | "direction" | "onClick">;

export type BackButtonOnClick = ArrowButtonProps["onClick"];

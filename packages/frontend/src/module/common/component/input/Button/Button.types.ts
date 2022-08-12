import { CSSProperties } from "react";

export type ButtonAppearance = "primary" | "secondary" | "outlined";

export type ButtonSize = "md" | "lg";

export type ButtonSizeStyle = Record<ButtonSize, CSSProperties>;

export interface ButtonProps {
    appearance?: ButtonAppearance;
    size?: ButtonSize;
}

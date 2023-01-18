import { ButtonProps as BaseButtonProps, ButtonSize, ButtonVariant, Theme } from "@peersyst/react-components";
import { FlattenInterpolation, ThemeProps, DefaultTheme, ThemedStyledProps } from "styled-components";

export type ButtonSizeStyle = Record<ButtonSize, FlattenInterpolation<ThemeProps<DefaultTheme>>>;

export type ButtonVariantStyle = Record<ButtonVariant, FlattenInterpolation<ThemedStyledProps<Partial<ButtonRootProps>, Theme>>>;

export interface ButtonProps extends BaseButtonProps {
    rounded?: boolean;
}

export interface ButtonRootProps {
    color?: string;
}

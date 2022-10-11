import { ButtonProps as BaseButtonProps, ButtonSize, ButtonVariant } from "@peersyst/react-components";
import { FlattenInterpolation, ThemeProps, DefaultTheme, css } from "styled-components";

export type ButtonSizeStyle = Record<ButtonSize, FlattenInterpolation<ThemeProps<DefaultTheme>>>;

export type ButtonVariantStyle = Record<ButtonVariant, ReturnType<typeof css>>;

export interface ButtonProps extends BaseButtonProps {
    rounded?: boolean;
}

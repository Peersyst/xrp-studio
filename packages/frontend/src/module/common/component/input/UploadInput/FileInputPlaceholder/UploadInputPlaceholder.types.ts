import { FlattenInterpolation, ThemeProps, DefaultTheme } from "styled-components";

export interface UploadInputPlaceholderProps {
    drag: boolean;
    supportedFilesLabel?: string;
    textInputPlaceholder?: string;
}

export type UploadInputPlaceholderLabelSize = "sm" | "md";
export type UploadInputPlaceholderLabelSizeStyles = Record<UploadInputPlaceholderLabelSize, FlattenInterpolation<ThemeProps<DefaultTheme>>>;

export interface UploadInputPlaceholderLabelProps {
    size: UploadInputPlaceholderLabelSize;
}

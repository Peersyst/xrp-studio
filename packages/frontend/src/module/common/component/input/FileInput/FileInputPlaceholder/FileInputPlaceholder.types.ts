import { FlattenInterpolation, ThemeProps, DefaultTheme } from "styled-components";

export interface FileInputPlaceholderProps {
    drag: boolean;
    supportedFilesLabel?: string;
}

export type FileInputPlaceholderLabelSize = "sm" | "md";
export type FileInputPlaceholderLabelSizeStyles = Record<FileInputPlaceholderLabelSize, FlattenInterpolation<ThemeProps<DefaultTheme>>>;

export interface FileInputPlaceholderLabelProps {
    size: FileInputPlaceholderLabelSize;
}

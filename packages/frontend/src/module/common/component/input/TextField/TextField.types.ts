import { TextFieldProps as BaseTextFieldProps } from "@peersyst/react-components";

export type TextFieldVariant = "outlined" | "filled";

export interface TextFieldProps extends BaseTextFieldProps {
    /**
     * Text field appearance
     */
    variant?: TextFieldVariant;
    /**
     * Size of the select
     */
    size?: "lg" | "md";
}

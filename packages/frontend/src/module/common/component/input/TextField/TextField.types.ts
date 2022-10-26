import { TextFieldProps as BaseTextFieldProps } from "@peersyst/react-components";

export type TextFieldVariant = "outlined" | "filled";

export type TextFieldSize = "lg" | "md";

export interface TextFieldProps extends BaseTextFieldProps {
    /**
     * Text field appearance
     */
    variant?: TextFieldVariant;
    /**
     * Size of the TextField
     */
    size?: TextFieldSize;
}

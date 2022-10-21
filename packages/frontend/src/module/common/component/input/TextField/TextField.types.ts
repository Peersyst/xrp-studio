import { TextFieldProps as BaseTextFieldProps } from "@peersyst/react-components";

/**
 * outlined: input with border
 * filled: input with background
 * standard: input with background when is inside a card
 */
export type TextFieldVariant = "outlined" | "filled" | "cardfilled";

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

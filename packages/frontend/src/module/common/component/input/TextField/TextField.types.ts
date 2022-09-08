import { TextFieldProps as BaseTextFieldProps } from "@peersyst/react-components";

export type TextFieldApperance = "outlined" | "filled";

export interface TextFieldProps extends BaseTextFieldProps {
    /**
     * Text field appearance
     */
    appearance?: TextFieldApperance;
}

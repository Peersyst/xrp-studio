import { TextAreaProps as BaseTextAreaProps } from "@peersyst/react-components";

export type TextAreaVariant = "outlined" | "filled";

export interface TextAreaProps extends BaseTextAreaProps {
    /**
     * TextArea appearance
     */
    variant?: TextAreaVariant;
    /**
     * Display length
     */
    displayLength?: boolean;
}

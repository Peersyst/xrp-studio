import { CoreFormControlledComponentProps, FormControlledComponentProps, LabelProps } from "@peersyst/react-components";
import { FaqInputTextFieldsProps } from "../FaqInput/FaqInput.types";
import { Faq } from "module/drop/types";

export type CoreFaqsInputProps = CoreFormControlledComponentProps<Faq[], LabelProps>;

export type FaqsInputProps = FormControlledComponentProps<CoreFaqsInputProps> & FaqInputTextFieldsProps;

export interface FaqsInputRootProps {
    hasLabel: boolean;
}

export interface AddFaqButtonProps {
    disabled?: boolean;
}

import { CoreFormControlledComponentProps, FormControlledComponentProps, LabelProps } from "@peersyst/react-components";
import { FaqsDto } from "module/api/service";
import { FaqInputTextFieldsProps } from "../FaqInput/FaqInput.types";

export type CoreFaqsInputProps = CoreFormControlledComponentProps<FaqsDto[], LabelProps>;

export type FaqsInputProps = FormControlledComponentProps<CoreFaqsInputProps> & FaqInputTextFieldsProps;

export interface FaqsInputRootProps {
    hasLabel: boolean;
}

export interface AddFaqButtonProps {
    disabled?: boolean;
}

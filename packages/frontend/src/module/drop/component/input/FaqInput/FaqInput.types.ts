import { TextFieldProps } from "module/common/component/input/TextField/TextField.types";
import { CoreFormControlledComponentProps, FormControlledComponentProps, LabelProps } from "@peersyst/react-components";
import { Faq } from "module/drop/types";

export type CoreFaqInputProps = CoreFormControlledComponentProps<Faq, LabelProps>;

export type FaqInputTextFieldsProps = Pick<TextFieldProps, "variant" | "size" | "autoFocus">;

export type FaqInputProps = FormControlledComponentProps<CoreFaqInputProps> &
    FaqInputTextFieldsProps & {
        onDelete?: () => void;
        idFaq: number;
    };

export interface FaqInputRootProps {
    hasLabel: boolean;
}

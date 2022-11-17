import { TextFieldProps } from "module/common/component/input/TextField/TextField.types";
import { CoreFormControlledComponentProps, FormControlledComponentProps, LabelProps } from "@peersyst/react-components";
import { FaqsDto } from "module/api/service";

export type CoreFaqInputProps = CoreFormControlledComponentProps<FaqsDto, LabelProps>;

export type FaqInputTextFieldsProps = Pick<TextFieldProps, "variant" | "size" | "autoFocus">;

export type FaqInputProps = FormControlledComponentProps<CoreFaqInputProps> &
    FaqInputTextFieldsProps & {
        onDelete?: () => void;
        idFaq: number;
    };

export interface FaqInputRootProps {
    hasLabel: boolean;
}

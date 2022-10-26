import { TextFieldProps } from "module/common/component/input/TextField/TextField.types";
import { CoreFormControlledComponentProps, FormControlledComponentProps, LabelProps } from "@peersyst/react-components";
import { MetadataAttributeDto } from "module/api/service";

export type CorePropertyInputProps = CoreFormControlledComponentProps<MetadataAttributeDto, LabelProps>;

export type PropertyInputTextFieldsProps = Pick<TextFieldProps, "variant" | "size" | "autoFocus">;

export type PropertyInputProps = FormControlledComponentProps<CorePropertyInputProps> &
    PropertyInputTextFieldsProps & {
        onDelete?: () => void;
    };

export interface PropertyInputRootProps {
    hasLabel: boolean;
}

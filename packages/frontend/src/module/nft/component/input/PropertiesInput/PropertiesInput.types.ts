import { CoreFormControlledComponentProps, FormControlledComponentProps, LabelProps } from "@peersyst/react-components";
import { MetadataAttributeDto } from "module/api/service";
import { PropertyInputTextFieldsProps } from "module/nft/component/input/PropertyInput/PropertyInput.types";

export type CorePropertiesInputProps = CoreFormControlledComponentProps<MetadataAttributeDto[], LabelProps>;

export type PropertiesInputProps = FormControlledComponentProps<CorePropertiesInputProps> & PropertyInputTextFieldsProps;

export interface PropertiesInputRootProps {
    hasLabel: boolean;
}

export interface AddPropertyButtonProps {
    disabled?: boolean;
}

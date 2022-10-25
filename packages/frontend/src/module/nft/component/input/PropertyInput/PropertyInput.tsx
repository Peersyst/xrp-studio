import { PropertyInputProps } from "module/nft/component/input/PropertyInput/PropertyInput.types";
import useTranslate from "module/common/hook/useTranslate";
import { FormControl, FormControlLabel, useFormControl } from "@peersyst/react-components";
import { MetadataAttributeDto } from "module/api/service";
import {
    DeletePropertyButton,
    PropertyInputRoot,
    PropertyInputTextField,
} from "module/nft/component/input/PropertyInput/PropertyInput.styles";

const PropertyInput = ({
    defaultValue = { traitType: "", value: "" },
    label,
    Label = FormControlLabel,
    LabelProps = {},
    variant,
    size,
    onDelete,
    autoFocus,
    ...rest
}: PropertyInputProps): JSX.Element => {
    const translate = useTranslate();
    const { setFocused } = useFormControl();

    const handleDelete = () => {
        setFocused(false);
        onDelete?.();
    };

    return (
        <FormControl<MetadataAttributeDto> Label={[Label, LabelProps]} label={label} defaultValue={defaultValue} {...rest}>
            {(values, setValues) => {
                const handleTraitTypeChange = (traitType: string) => {
                    setValues({ ...values, traitType });
                };

                const handleValueChange = (value: string) => {
                    setValues({ ...values, value });
                };

                return (
                    <PropertyInputRoot hasLabel={!!label} className="property-input-root">
                        <PropertyInputTextField
                            variant={variant}
                            size={size}
                            placeholder={translate("traitType")}
                            value={values.traitType}
                            onChange={handleTraitTypeChange}
                            autoFocus={autoFocus}
                        />
                        <PropertyInputTextField
                            variant={variant}
                            size={size}
                            placeholder={translate("value")}
                            value={values.value}
                            onChange={handleValueChange}
                        />
                        {onDelete && <DeletePropertyButton onClick={handleDelete} />}
                    </PropertyInputRoot>
                );
            }}
        </FormControl>
    );
};

export default PropertyInput;

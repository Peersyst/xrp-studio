import { PropertiesInputProps } from "module/nft/component/input/PropertiesInput/PropertiesInput.types";
import { FormControl, FormControlLabel, Row } from "@peersyst/react-components";
import { MetadataAttributeDto } from "module/api/service";
import { AddPropertyButton, PropertiesInputRoot } from "module/nft/component/input/PropertiesInput/PropertiesInput.styles";
import PropertyInput from "module/nft/component/input/PropertyInput/PropertyInput";
import { PlusCircleIcon } from "icons";
import useTranslate from "module/common/hook/useTranslate";
import { useState } from "react";
import { capitalize, cx } from "@peersyst/react-utils";

const PropertiesInput = ({
    defaultValue = [],
    Label = FormControlLabel,
    LabelProps = {},
    label,
    variant = "outlined",
    size,
    readonly,
    disabled,
    className,
    ...rest
}: PropertiesInputProps): JSX.Element => {
    const translate = useTranslate();
    const [addition, setAddition] = useState(false);

    const variantClassName = capitalize(variant);

    const handlePropertyTextFieldFocus = () => {
        if (addition) setAddition(false);
    };

    return (
        <FormControl<MetadataAttributeDto[]>
            Label={[Label, LabelProps]}
            label={label}
            defaultValue={defaultValue}
            readonly={readonly}
            disabled={disabled}
            className={cx(variantClassName, className)}
            {...rest}
        >
            {(values, setValues) => {
                const handleChange = (vals: MetadataAttributeDto, index: number) => {
                    const newValues = [...values];
                    newValues[index] = vals;
                    setValues(newValues);
                };

                const handleDelete = (index: number) => {
                    const valuesCopy = [...values];
                    valuesCopy.splice(index, 1);
                    setValues(valuesCopy);
                };

                const handleAddition = () => {
                    setValues([...values, { traitType: "", value: "" }]);
                    setAddition(true);
                };

                return (
                    <PropertiesInputRoot hasLabel={!!label}>
                        {values.map((vals, index) => (
                            <PropertyInput
                                autoFocus={addition && index === values.length - 1}
                                onFocus={handlePropertyTextFieldFocus}
                                key={index}
                                value={vals}
                                onChange={(newVals) => handleChange(newVals, index)}
                                onDelete={() => handleDelete(index)}
                                variant={variant}
                                size={size}
                                readonly={readonly}
                            />
                        ))}
                        {!readonly && (
                            <AddPropertyButton onClick={handleAddition} disabled={disabled}>
                                <Row gap="0.625rem" alignItems="center">
                                    <PlusCircleIcon css={{ fontSize: "1.5rem" }} />
                                    {translate("addProperty")}
                                </Row>
                            </AddPropertyButton>
                        )}
                    </PropertiesInputRoot>
                );
            }}
        </FormControl>
    );
};

export default PropertiesInput;

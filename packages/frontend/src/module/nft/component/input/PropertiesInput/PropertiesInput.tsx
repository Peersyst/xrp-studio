import { PropertiesInputProps } from "module/nft/component/input/PropertiesInput/PropertiesInput.types";
import { FormControl, FormControlLabel, Row } from "@peersyst/react-components";
import { MetadataAttributeDto } from "module/api/service";
import { AddPropertyButton, PropertiesInputRoot } from "module/nft/component/input/PropertiesInput/PropertiesInput.styles";
import PropertyInput from "module/nft/component/input/PropertyInput/PropertyInput";
import { PlusCircleIcon } from "icons";
import useTranslate from "module/common/hook/useTranslate";

const PropertiesInput = ({
    defaultValue = [],
    Label = FormControlLabel,
    LabelProps = {},
    label,
    variant,
    size,
    ...rest
}: PropertiesInputProps): JSX.Element => {
    const translate = useTranslate();

    return (
        <FormControl<MetadataAttributeDto[]> Label={[Label, LabelProps]} label={label} defaultValue={defaultValue} {...rest}>
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
                };

                return (
                    <PropertiesInputRoot hasLabel={!!label}>
                        {values.map((vals, index) => (
                            <PropertyInput
                                key={index}
                                value={vals}
                                onChange={(newVals) => handleChange(newVals, index)}
                                onDelete={() => handleDelete(index)}
                                variant={variant}
                                size={size}
                            />
                        ))}
                        <AddPropertyButton onClick={handleAddition}>
                            <Row gap="0.625rem" alignItems="center">
                                <PlusCircleIcon css={{ fontSize: "1.5rem" }} />
                                {translate("addProperty")}
                            </Row>
                        </AddPropertyButton>
                    </PropertiesInputRoot>
                );
            }}
        </FormControl>
    );
};

export default PropertiesInput;

import { FormControl, FormControlLabel, Row } from "@peersyst/react-components";
import { PlusCircleIcon } from "icons";
import useTranslate from "module/common/hook/useTranslate";
import { useState } from "react";
import { capitalize, cx } from "@peersyst/react-utils";
import { FaqsInputProps } from "./FaqsInput.types";
import FaqInput from "../FaqInput/FaqInput";
import { AddFaqButton, FaqInputRoot } from "./FaqsInput.styles";
import { Faq } from "module/drop/types";

const FaqsInput = ({
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
}: FaqsInputProps): JSX.Element => {
    const translate = useTranslate();
    const [addition, setAddition] = useState(false);

    const variantClassName = capitalize(variant);

    const handlePropertyTextFieldFocus = () => {
        if (addition) setAddition(false);
    };

    return (
        <FormControl<Faq[]>
            Label={[Label, LabelProps]}
            defaultValue={defaultValue}
            readonly={readonly}
            disabled={disabled}
            className={cx(variantClassName, className)}
            {...rest}
        >
            {(values, setValues) => {
                const handleChange = (vals: Faq, index: number) => {
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
                    setValues([...values, { question: "", answer: "" }]);
                    setAddition(true);
                };

                return (
                    <FaqInputRoot hasLabel={!!label}>
                        {values.map((vals, index) => (
                            <FaqInput
                                autoFocus={addition && index === values.length - 1}
                                onFocus={handlePropertyTextFieldFocus}
                                key={index}
                                idFaq={index + 1}
                                value={vals}
                                onChange={(newVals) => handleChange(newVals, index)}
                                onDelete={() => handleDelete(index)}
                                variant={variant}
                                size={size}
                                readonly={readonly}
                            />
                        ))}
                        {!readonly && (
                            <AddFaqButton onClick={handleAddition} disabled={disabled}>
                                <Row gap="0.625rem" alignItems="center">
                                    <PlusCircleIcon css={{ fontSize: "1.5rem" }} />
                                    {translate("addFaq")}
                                </Row>
                            </AddFaqButton>
                        )}
                    </FaqInputRoot>
                );
            }}
        </FormControl>
    );
};

export default FaqsInput;

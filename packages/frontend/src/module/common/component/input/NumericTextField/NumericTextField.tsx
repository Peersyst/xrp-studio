import useTranslate from "module/common/hook/useTranslate";
import TextField from "../TextField/TextField";
import { TextFieldProps } from "../TextField/TextField.types";
import useNumericInput from "./hooks/useNumericInput";
import { useControlled } from "@peersyst/react-hooks";

export type NumericTextFieldProps = TextFieldProps & {
    gt?: number;
    gte?: number;
    lt?: number;
    lte?: number;
    maxDecimals?: number;
};

const NumericTextField = ({
    validators,
    placeholder,
    gt,
    gte,
    lt,
    lte,
    maxDecimals,
    defaultValue = "",
    value: valueProp,
    onChange: onChangeProp,
    ...textFieldProps
}: NumericTextFieldProps): JSX.Element => {
    const translate = useTranslate();
    //TODO: update useNumericInput when upgrading react components
    const { format, parse } = useNumericInput({ maxDecimals });
    const [value, setValue] = useControlled(defaultValue, valueProp, onChangeProp);

    function handleChange(newValue: string): void {
        setValue(parse(newValue, value));
    }
    return (
        <TextField
            onChange={handleChange}
            value={format(value)}
            type="number"
            placeholder={placeholder || translate("enterTheAmount")}
            validators={{ number: true, lt, gt, gte, lte, ...validators }}
            {...textFieldProps}
        />
    );
};

export default NumericTextField;

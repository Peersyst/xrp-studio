import useTranslate from "module/common/hook/useTranslate";
import TextField from "../TextField/TextField";
import { TextFieldProps } from "../TextField/TextField.types";

export type NumericTextFieldProps = TextFieldProps;

const NumericTextField = ({ validators, placeholder, ...textFieldProps }: TextFieldProps): JSX.Element => {
    const translate = useTranslate();
    return (
        <TextField
            placeholder={placeholder || translate("enterTheAmount")}
            validators={{ number: true, ...validators }}
            {...textFieldProps}
        />
    );
};

export default NumericTextField;

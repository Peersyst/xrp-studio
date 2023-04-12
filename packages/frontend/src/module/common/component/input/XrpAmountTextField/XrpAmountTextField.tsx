import { useControlled } from "@peersyst/react-hooks";
import { cx } from "@peersyst/react-utils";
import { NumericTextFieldProps } from "../NumericTextField/NumericTextField";
import { XrpAmountTextFieldRoot } from "./XrpAmountTextField.styles";
import XrpAmountTextFieldLabel from "./XrpAmountTextFieldLabel";

export type XrpAmountTextFieldProps = Omit<NumericTextFieldProps, "label" | "Label" | "LabelProps"> & {
    label: string;
};

function XrpAmountTextField({ className, label, defaultValue = "0", value, onChange, ...rest }: XrpAmountTextFieldProps): JSX.Element {
    const [amount, setAmount] = useControlled(defaultValue, value, onChange);
    return (
        <XrpAmountTextFieldRoot
            className={cx("xrp-amount-text-field", className)}
            value={amount}
            onChange={setAmount}
            label={<XrpAmountTextFieldLabel label={label} amount={amount} />}
            {...rest}
        />
    );
}

export default XrpAmountTextField;

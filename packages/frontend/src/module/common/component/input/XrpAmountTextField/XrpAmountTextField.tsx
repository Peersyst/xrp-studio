import { useControlled } from "@peersyst/react-hooks";
import { cx } from "@peersyst/react-utils";
import { NumericTextFieldProps } from "../NumericTextField/NumericTextField";
import { XrpAmountTextFieldRoot } from "./XrpAmountTextField.styles";
import XrpAmountTextFieldLabel from "./XrpAmountTextFieldLabel";
import config from "config/config";
import { useGetXrpBalance } from "module/wallet/hook/useGetXrpBalance/useGetXrpBalance";
import XrplService from "module/blockchain/service/XrplService/XrplService";

export type XrpAmountTextFieldProps = Omit<NumericTextFieldProps, "label" | "Label" | "LabelProps"> & {
    label: string;
};

function XrpAmountTextField({
    className,
    label,
    defaultValue = "",
    value,
    lte,
    gte,
    onChange,
    ...rest
}: XrpAmountTextFieldProps): JSX.Element {
    const [amount, setAmount] = useControlled(defaultValue, value, onChange);
    const { data: balance = 0 } = useGetXrpBalance();

    const maxAvailable = getBalanceMinusFee(balance);

    return (
        <XrpAmountTextFieldRoot
            className={cx("xrp-amount-text-field", className)}
            value={amount}
            //TODO: improve validation with bigints
            lte={Math.min(maxAvailable, lte ?? maxAvailable)}
            gte={Math.max(gte ?? 0, 0)}
            onChange={setAmount}
            maxDecimals={config.maxXrpAmountDecimals}
            label={<XrpAmountTextFieldLabel label={label} amount={amount} />}
            {...rest}
        />
    );
}

function getBalanceMinusFee(balance: number): number {
    return Number(XrplService.dropsToXrp(String(BigInt(XrplService.xrpToDrops(String(balance))) - BigInt(String(config.feeInDrops)))));
}

export default XrpAmountTextField;

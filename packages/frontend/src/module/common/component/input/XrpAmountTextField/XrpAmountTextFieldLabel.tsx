import { Row } from "@peersyst/react-components";
import clsx from "clsx";
import config from "config/config";
import Balance from "../../display/Balance/Balance";

export interface XrpAmountTextFieldLabelProps {
    className?: string;
    style?: React.CSSProperties;
    label: string;
    amount: string;
}

function XrpAmountTextFieldLabel({ className, amount, label, ...rest }: XrpAmountTextFieldLabelProps): JSX.Element {
    return (
        <Row className={clsx("xrp-amount-text-field-label", className)} justifyContent="space-between" alignItems="center" {...rest}>
            <span>{label}</span>
            <Balance balance={amount} variant="body1" textAlign="end" units={config.nativeToken} />
        </Row>
    );
}

export default XrpAmountTextFieldLabel;

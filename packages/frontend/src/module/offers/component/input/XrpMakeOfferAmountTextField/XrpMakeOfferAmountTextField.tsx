import clsx from "clsx";
import XrpAmountTextField from "module/common/component/input/XrpAmountTextField/XrpAmountTextField";
import useXrpMakeOfferAmountTextField from "./hooks/useXrpMakeOfferAmountTextField";
import { XrpMakeOfferAmountTextFieldProps } from "./XrpMakeOfferAmountTextField.types";

function XrpMakeOfferAmountTextField({ className, offerType, ...rest }: XrpMakeOfferAmountTextFieldProps): JSX.Element {
    const baseProps = useXrpMakeOfferAmountTextField(offerType);
    return <XrpAmountTextField className={clsx("xrp-make-offer-amount-text-field", className)} {...baseProps} {...rest} />;
}

export default XrpMakeOfferAmountTextField;

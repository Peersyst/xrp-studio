import { cx } from "@peersyst/react-utils";
import TextField from "../TextField/TextField";
import { TextFieldProps } from "../TextField/TextField.types";

const XrpAddressTextField = ({ className, validators, ...rest }: TextFieldProps): JSX.Element => {
    return <TextField className={cx("xrp-address-text-field", className)} validators={{ address: true, ...validators }} {...rest} />;
};

export default XrpAddressTextField;

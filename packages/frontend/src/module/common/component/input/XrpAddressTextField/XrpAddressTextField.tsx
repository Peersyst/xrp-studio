import { cx } from "@peersyst/react-utils";
import useTranslate from "module/common/hook/useTranslate";
import useWallet from "module/wallet/hook/useWallet";
import TextField from "../TextField/TextField";
import { TextFieldProps } from "../TextField/TextField.types";

export type XrpAddressTextFieldProps = TextFieldProps & {
    allowWalletAddress?: boolean;
};

const XrpAddressTextField = ({ className, validators, allowWalletAddress = true, ...rest }: XrpAddressTextFieldProps): JSX.Element => {
    const { address: walletAddress } = useWallet();
    const translateError = useTranslate("error");

    const notEqValidator = [walletAddress, translateError("invalidOwnAddress")];

    return (
        <TextField
            className={cx("xrp-address-text-field", className)}
            validators={{ ...(!allowWalletAddress && { notEq: notEqValidator }), ...validators, address: true }}
            {...rest}
        />
    );
};

export default XrpAddressTextField;

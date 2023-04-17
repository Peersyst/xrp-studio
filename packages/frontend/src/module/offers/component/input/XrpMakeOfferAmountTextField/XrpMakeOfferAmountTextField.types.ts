import { XrpAmountTextFieldProps } from "module/common/component/input/XrpAmountTextField/XrpAmountTextField";
import { CreateNftOfferModalType } from "../../feedback/NftCreateOfferModal/NftCreateOfferModal.types";

export type XrpMakeOfferAmountTextFieldProps = Omit<XrpAmountTextFieldProps, "max" | "min" | "error" | "hint"> & {
    offerType?: CreateNftOfferModalType;
};

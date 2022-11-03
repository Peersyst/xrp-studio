import { BaseValidator, TranslateFn } from "@peersyst/react-components";
import { isValidAddress } from "xrpl";

export class XrplAddressValidator extends BaseValidator {
    constructor(message: string | undefined, translate: TranslateFn) {
        super(message || translate("invalidAddress"));
    }

    validate(value: string): boolean {
        return value === "" || isValidAddress(value);
    }
}

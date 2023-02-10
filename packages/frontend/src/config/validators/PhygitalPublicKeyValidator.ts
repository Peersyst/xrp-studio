import { BaseValidator, TranslateFn } from "@peersyst/react-components";

export default class PhygitalPublicKeyValidator extends BaseValidator {
    constructor(message: string | undefined, translate: TranslateFn) {
        super(message || translate("invalidPhygitalPublicKey"));
    }

    validate(value: string): boolean {
        const isBase64 = /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/g.test(value);

        return isBase64;
    }
}

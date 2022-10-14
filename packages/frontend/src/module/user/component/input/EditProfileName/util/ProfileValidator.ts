import { BaseValidator } from "@peersyst/react-components";

export class UserValidator extends BaseValidator {
    isValid: boolean;

    constructor(message: string, isValid: boolean) {
        super(message);
        this.isValid = isValid;
    }

    validate(): boolean {
        return this.isValid;
    }
}

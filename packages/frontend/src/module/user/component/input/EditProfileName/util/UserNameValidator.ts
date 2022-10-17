import { BaseValidator } from "@peersyst/react-components";

export class UserNameValidator extends BaseValidator {
    exist: boolean;
    prevName: string;
    loading: boolean;

    constructor(message: string, exist: boolean, prevName: string, loading: boolean) {
        super(message);
        this.exist = exist;
        this.prevName = prevName;
        this.loading = loading;
    }

    validate(newName: string): boolean {
        return this.loading || !this.exist || this.prevName === newName;
    }
}

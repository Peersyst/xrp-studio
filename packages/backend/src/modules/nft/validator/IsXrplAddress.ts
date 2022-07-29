import { registerDecorator, ValidationOptions } from "class-validator";
import { isValidAddress } from "xrpl";

export function IsXrplAddress(validationOptions?: ValidationOptions) {
    return function (object: any, propertyName: string) {
        registerDecorator({
            name: "IsXrplAddress",
            target: object.constructor,
            propertyName,
            constraints: [],
            options: validationOptions,
            validator: {
                validate(value: any): boolean {
                    return isValidAddress(value);
                },
                defaultMessage() {
                    return "$value is not a valid xrpl address";
                },
            },
        });
    };
}

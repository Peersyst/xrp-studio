import { ValidationOptions, ValidateIf } from "class-validator";

export function IsOptional(validationOptions?: ValidationOptions) {
    return ValidateIf((_object, value) => value !== undefined, validationOptions);
}

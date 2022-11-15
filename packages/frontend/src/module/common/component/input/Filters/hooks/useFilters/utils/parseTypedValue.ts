import { FilterTypeName, FilterTypes } from "module/common/component/input/Filters/hooks/useFilters";

export const TYPE_VALIDATOR: Record<FilterTypeName, (value: string) => boolean> = {
    boolean: (value: string) => value === "true" || value === "false",
    number: (value: string) => !isNaN(Number(value)),
    string: (value: string) => typeof value === "string",
    Date: (value: string) => !isNaN(Date.parse(value)),
};

export const TYPE_PARSER: Record<FilterTypeName, any> = {
    boolean: Boolean,
    number: Number,
    string: String,
    Date: Date,
};

export default function <K extends FilterTypeName = "string">(value: string, type: K): FilterTypes[K] {
    const isValid = TYPE_VALIDATOR[type];
    const parser = TYPE_PARSER[type];

    if (!isValid(value)) throw new Error(`${value} is not of type ${type}`);
    return parser(value);
}

export type FilterType = string | number | boolean | Date;

export type FilterTypeName = "string" | "number" | "boolean" | "Date";

export interface Filter {
    name: string;
    type?: FilterTypeName;
    array?: boolean;
}

export type UseFilterReturn = Record<string, FilterType | FilterType[]>;

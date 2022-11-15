export interface FilterTypes {
    string: string;
    number: number;
    boolean: boolean;
    Date: Date;
}
export type FilterTypeName = keyof FilterTypes;
export type FilterType = FilterTypes[keyof FilterTypes];

export type Filter<T = FilterType> = {
    array?: boolean;
} & ({ type: FilterTypeName } | { parser: (value: string) => T });

export type Filters = Record<string, Filter>;

export type UseFilterReturn<T extends Filters> = {
    [F in keyof T]: T[F] extends { type: infer N }
        ? N extends FilterTypeName
            ? T[F] extends { array: true }
                ? FilterTypes[N][]
                : FilterTypes[N]
            : T[F] extends { array: true }
            ? FilterType[]
            : FilterType
        : T[F] extends { parser: (value: string) => infer V }
        ? T[F] extends { array: true }
            ? V[]
            : V
        : T[F] extends { array: true }
        ? any[]
        : any;
};

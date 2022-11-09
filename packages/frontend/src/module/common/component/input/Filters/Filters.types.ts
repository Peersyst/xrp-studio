import { ReactElement } from "react";

export type Order = "ASC" | "DESC";

export type MultipleSelector<T, M extends boolean> = M extends true ? T[] : T;

export interface FiltersProps {
    children?: { header?: ReactElement; content?: ReactElement };
}

export enum BaseFiltersNames {
    QUERY = "query",
    ORDER = "order",
}

import { ReactElement } from "react";

export type Order = "ASC" | "DESC";

export enum BaseFiltersNames {
    ORDER = "order",
    QUERY = "query",
}

export interface FiltersProps {
    children: { header?: ReactElement; content?: ReactElement };
}

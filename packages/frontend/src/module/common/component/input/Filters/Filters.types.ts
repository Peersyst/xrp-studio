import { ReactElement } from "react";

export type Order = "ASC" | "DESC";

export interface FiltersProps {
    children?: { header?: ReactElement; content?: ReactElement };
}

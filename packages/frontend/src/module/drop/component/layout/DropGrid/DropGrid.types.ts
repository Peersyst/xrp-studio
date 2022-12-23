import { PaginatedDropDto } from "module/api/service/models/PaginatedDropDto";
import { GridProps } from "module/common/component/layout/Grid/Grid.types";

export type DropGridProps = Omit<
    GridProps<PaginatedDropDto, any>,
    "children" | "Skeletons" | "filters" | "filterBreakpoints" | "breakpoints"
>;

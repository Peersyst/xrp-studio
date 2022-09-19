import { PaginatedNftDto } from "module/api/service";
import { ExposedBaseGridProps } from "module/common/component/layout/BaseGrid/BaseGrid.types";
import { InfiniteData, PaginatedData } from "query-utils";

export interface BaseNftsGridProps<T extends PaginatedData> extends Omit<ExposedBaseGridProps<T>, "children" | "data"> {
    data: InfiniteData<PaginatedNftDto> | undefined;
}

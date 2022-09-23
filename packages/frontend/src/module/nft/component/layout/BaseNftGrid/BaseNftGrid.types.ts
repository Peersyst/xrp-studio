import { PaginatedNftDto } from "module/api/service";
import { ExposedBaseGridProps } from "module/common/component/layout/BaseGrid/BaseGrid.types";

export type BaseNftsGridProps = Omit<ExposedBaseGridProps<PaginatedNftDto>, "children">;

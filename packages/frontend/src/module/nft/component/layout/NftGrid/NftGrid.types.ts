import { PaginatedNftDto } from "module/api/service";
import { GridProps } from "module/common/component/layout/Grid/Grid.types";

//TODO: implement TagT type when implementing the tags
export type NftGridProps<TagT> = Omit<GridProps<PaginatedNftDto, TagT>, "children" | "Skeletons" | "breakpoints" | "filterBreakpoints">;

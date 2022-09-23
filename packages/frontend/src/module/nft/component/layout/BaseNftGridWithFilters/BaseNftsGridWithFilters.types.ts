import { PaginatedNftDto } from "module/api/service";
import { BaseGridWithFilterProps } from "module/common/component/layout/BaseGridWithFilters/BaseGridWithFilters.types";

//TODO: implement TagT type when implementing tags
export type BaseNftsGridWithFiltersProps<TagT> = Omit<
    BaseGridWithFilterProps<PaginatedNftDto, TagT>,
    "children" | "Skeletons" | "cols" | "breakpoints" | "filterBreakpoints"
>;

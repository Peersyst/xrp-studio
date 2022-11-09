import { SelectorGroupFilterProps } from "module/common/component/input/Filters/SelectorGroupFilter/SelectorGroupFilter.types";

export interface NftCollectionsSelectorGroupFilterProps<Multiple extends boolean = false>
    extends Omit<SelectorGroupFilterProps<string, Multiple>, "name"> {
    loading?: boolean;
    name?: string;
    numberOfSkeletons?: number;
}

export interface CollectionsSelectorSkeletonsProps {
    count: number;
}

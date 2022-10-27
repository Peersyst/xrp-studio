import { SelectorGroupFilterProps } from "module/common/component/input/Filters/SelectorGroupFilter/SelectorGroupFilter.types";
import { CollectionId } from "../../layout/NftGrid/NftGrid.types";

export interface NftCollectionsSelectorGroupFilterProps<Multiple extends boolean = false>
    extends Omit<SelectorGroupFilterProps<CollectionId, Multiple>, "name"> {
    loading?: boolean;
    name?: string;
    numberOfSkeletons?: number;
}

export interface CollectionsSelectorSkeletonsProps {
    count: number;
}

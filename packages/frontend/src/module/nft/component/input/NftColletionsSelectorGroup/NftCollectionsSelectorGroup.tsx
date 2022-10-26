import { Loader } from "@peersyst/react-components";
import SelectorGroupFilter from "module/common/component/input/Filters/SelectorGroupFilter/SelectorGroupFilter";
import { SelectorGroupFilterProps } from "module/common/component/input/Filters/SelectorGroupFilter/SelectorGroupFilter.types";
import { NftFilterNames } from "module/nft/query/useGetNfts";
import { CollectionId } from "../../layout/NftGrid/NftGrid.types";

export interface NftCollectionsSelectorGroupProps<Multiple extends boolean = false>
    extends Omit<SelectorGroupFilterProps<CollectionId, Multiple>, "name"> {
    loading?: boolean;
    name?: string;
}

function NftCollectionsSelectorGroup<Multiple extends boolean = false>({
    loading,
    name = NftFilterNames.COLLECTIONS,
    type = "switch",
    ...rest
}: NftCollectionsSelectorGroupProps<Multiple>): JSX.Element {
    return loading ? <Loader /> : <SelectorGroupFilter<CollectionId, Multiple> {...rest} name={name} type={type} />;
}

export default NftCollectionsSelectorGroup;

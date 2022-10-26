import { Selector, Skeleton } from "@peersyst/react-components";
import SelectorGroupFilter from "module/common/component/input/Filters/SelectorGroupFilter/SelectorGroupFilter";
import { SelectorGroupFilterProps } from "module/common/component/input/Filters/SelectorGroupFilter/SelectorGroupFilter.types";
import { NftFilterNames } from "module/nft/query/useGetNfts";
import { CollectionId } from "../../layout/NftGrid/NftGrid.types";

export interface NftCollectionsSelectorGroupProps<Multiple extends boolean = false>
    extends Omit<SelectorGroupFilterProps<CollectionId, Multiple>, "name"> {
    loading?: boolean;
    name?: string;
}

interface CollectionsSelectorSkeletonsProps {
    count: number;
}

export const CollectionsSelectorSkeletons = ({ count }: CollectionsSelectorSkeletonsProps): JSX.Element => {
    return (
        <>
            {[...Array(count)].map((_, key) => (
                <Skeleton loading={true} width="100%">
                    <Selector key={key} label="Loading collection" value={0} type="switch" />
                </Skeleton>
            ))}
        </>
    );
};

function NftCollectionsSelectorGroup<Multiple extends boolean = false>({
    loading,
    name = NftFilterNames.COLLECTIONS,
    type = "switch",
    ...rest
}: NftCollectionsSelectorGroupProps<Multiple>): JSX.Element {
    return loading ? (
        <CollectionsSelectorSkeletons count={3} />
    ) : (
        <SelectorGroupFilter<CollectionId, Multiple> {...rest} name={name} type={type} />
    );
}

export default NftCollectionsSelectorGroup;

import { Selector, Skeleton, Typography } from "@peersyst/react-components";
import SelectorGroupFilter from "module/common/component/input/Filters/SelectorGroupFilter/SelectorGroupFilter";
import { SelectorGroupFilterProps } from "module/common/component/input/Filters/SelectorGroupFilter/SelectorGroupFilter.types";
import useTranslate from "module/common/hook/useTranslate";
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
    options,
    ...rest
}: NftCollectionsSelectorGroupProps<Multiple>): JSX.Element {
    const translate = useTranslate("error");
    return loading || options === undefined ? (
        <CollectionsSelectorSkeletons count={3} />
    ) : options.length === 0 ? (
        <Typography variant="body1" light textAlign="center">
            {translate("withoutCollections")}
        </Typography>
    ) : (
        <SelectorGroupFilter<CollectionId, Multiple> {...rest} name={name} type={type} options={options} />
    );
}

export default NftCollectionsSelectorGroup;

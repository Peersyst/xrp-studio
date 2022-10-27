import { Selector, Skeleton, Typography } from "@peersyst/react-components";
import SelectorGroupFilter from "module/common/component/input/Filters/SelectorGroupFilter/SelectorGroupFilter";
import useTranslate from "module/common/hook/useTranslate";
import { NftFilterNames } from "module/nft/query/useGetNfts";
import { CollectionId } from "../../layout/NftGrid/NftGrid.types";
import { CollectionsSelectorSkeletonsProps, NftCollectionsSelectorGroupFilterProps } from "./NftCollectionsSelectorGroupFilter.types";

export const CollectionsSelectorSkeletons = ({ count }: CollectionsSelectorSkeletonsProps): JSX.Element => {
    return (
        <>
            {[...Array(count)].map((_, key) => (
                <Skeleton loading={true} width="100%" key={key}>
                    <Selector label="Loading collection" value={0} type="switch" />
                </Skeleton>
            ))}
        </>
    );
};

function NftCollectionsSelectorGroupFilter<Multiple extends boolean = false>({
    loading,
    name = NftFilterNames.COLLECTIONS,
    type = "switch",
    options,
    numberOfSkeletons = 3,
    ...rest
}: NftCollectionsSelectorGroupFilterProps<Multiple>): JSX.Element {
    const translate = useTranslate("error");
    return loading || options === undefined ? (
        <CollectionsSelectorSkeletons count={numberOfSkeletons} />
    ) : options.length === 0 ? (
        <Typography variant="body1" light textAlign="center">
            {translate("withoutCollections")}
        </Typography>
    ) : (
        <SelectorGroupFilter<CollectionId, Multiple> {...rest} name={name} type={type} options={options} />
    );
}

export default NftCollectionsSelectorGroupFilter;

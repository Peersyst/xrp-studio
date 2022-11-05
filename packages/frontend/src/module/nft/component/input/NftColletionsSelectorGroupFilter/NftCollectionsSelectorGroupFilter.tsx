import { Typography } from "@peersyst/react-components";
import { SelectorSkeletons } from "module/common/component/feedback/Skeletons/Skeletons";
import SelectorGroupFilter from "module/common/component/input/Filters/SelectorGroupFilter/SelectorGroupFilter";
import useTranslate from "module/common/hook/useTranslate";
import { NftFilterNames } from "module/nft/query/useGetNfts";
import { CollectionId } from "../../layout/NftGrid/NftGrid.types";
import { NftCollectionsSelectorGroupFilterProps } from "./NftCollectionsSelectorGroupFilter.types";

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
        <SelectorSkeletons count={numberOfSkeletons} />
    ) : options.length === 0 ? (
        <Typography variant="body1" light textAlign="center">
            {translate("withoutCollections")}
        </Typography>
    ) : (
        <SelectorGroupFilter<CollectionId, Multiple> {...rest} name={name} type={type} options={options} />
    );
}

export default NftCollectionsSelectorGroupFilter;

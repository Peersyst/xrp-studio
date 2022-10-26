import { BaseCardSkeletons } from "module/common/component/feedback/Skeletons/Skeletons";
import NftCard from "../../display/NftCard/NftCard";
import { PaginatedNftDto } from "module/api/service";
import { CollectionId, NftGridProps } from "./NftGrid.types";
import Grid from "module/common/component/layout/Grid/Grid";
import { useGetNftGridBreakpoints } from "./hook/useGetNftGridBreakpoints";
import SelectorGroupFilter from "module/common/component/input/Filters/SelectorGroupFilter/SelectorGroupFilter";
import { UseGetNftsOptions } from "module/nft/query/useGetNfts";
import useGetNftTags from "./hook/useGetNftTags";
import useGetCollectionOptions from "./hook/useGetCollectionOptions";
import useFilters from "module/common/component/input/Filters/hooks/useFilters";

function NftGrid({ loading, collections = [], ...rest }: NftGridProps): JSX.Element {
    const breakpoints = useGetNftGridBreakpoints();
    const { setValue: setFilters, value: filters } = useFilters<UseGetNftsOptions>();
    const tags = useGetNftTags(collections);
    const collectionsOptions = useGetCollectionOptions(collections);
    const cleanFilters = () => setFilters({ ["collections"]: undefined });
    const removeTag = (tag: number) => setFilters({ ["collections"]: filters["collections"]?.filter((t) => t !== tag) });
    return (
        <Grid<PaginatedNftDto, CollectionId>
            filters={{
                ...(collections.length > 0 && {
                    content: <SelectorGroupFilter multiple={true} name="collections" options={collectionsOptions} type="switch" />,
                }),
            }}
            onClearTags={cleanFilters}
            onTagClicked={removeTag}
            loading={loading}
            tags={tags}
            breakpoints={breakpoints}
            Skeletons={BaseCardSkeletons}
            {...rest}
        >
            {(nfts) => nfts.map((nft, key) => <NftCard nft={nft} key={key} loading={loading} />)}
        </Grid>
    );
}

export default NftGrid;

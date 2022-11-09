import { BaseCardSkeletons } from "module/common/component/feedback/Skeletons/Skeletons";
import NftCard from "../../display/NftCard/NftCard";
import { PaginatedNftDto } from "module/api/service";
import { CollectionId, NftGridProps } from "./NftGrid.types";
import Grid from "module/common/component/layout/Grid/Grid";
import { useGetNftGridBreakpoints } from "./hook/useGetNftGridBreakpoints";
import useGetNftActiveTags from "./hook/useGetNftActiveTags";
import useGetCollectionOptions from "./hook/useGetCollectionOptions";
import useCleanCollections from "./hook/useCleanCollections";
import NftCollectionsSelectorGroup from "../../input/NftColletionsSelectorGroupFilter/NftCollectionsSelectorGroupFilter";
import { FiltersProvider } from "module/common/component/input/Filters/FiltersContext";
import { GridProps } from "module/common/component/layout/Grid/Grid.types";

function InnerNftGrid({
    loading,
    ...rest
}: Omit<GridProps<PaginatedNftDto, CollectionId>, "Skeletons" | "children" | "breakpoints">): JSX.Element {
    const breakpoints = useGetNftGridBreakpoints();
    return (
        <Grid<PaginatedNftDto, CollectionId> breakpoints={breakpoints} loading={loading} Skeletons={BaseCardSkeletons} {...rest}>
            {(nfts) => nfts.map((nft, key) => <NftCard nft={nft} key={key} loading={loading} />)}
        </Grid>
    );
}

function InnerNftGridWithFilters({ loadingNfts, loadingCollections, collections, ...rest }: Omit<NftGridProps, "filters">): JSX.Element {
    const tags = useGetNftActiveTags(collections || []);
    const collectionsOptions = useGetCollectionOptions(collections || []);
    const { cleanAllCollections, cleanCollection } = useCleanCollections();

    return (
        <InnerNftGrid
            withFilters={true}
            filters={{
                ...(collections && {
                    content: <NftCollectionsSelectorGroup multiple loading={loadingCollections} options={collectionsOptions} />,
                }),
            }}
            onClearTags={cleanAllCollections}
            onTagClicked={cleanCollection}
            loading={loadingNfts}
            tags={tags}
            {...rest}
        />
    );
}

function NftGrid({ filtersContext, loadingNfts, ...rest }: NftGridProps): JSX.Element {
    return filtersContext ? (
        <FiltersProvider value={filtersContext}>
            <InnerNftGridWithFilters loadingNfts={loadingNfts} {...rest} />
        </FiltersProvider>
    ) : (
        <InnerNftGrid loading={loadingNfts} {...rest} />
    );
}

export default NftGrid;

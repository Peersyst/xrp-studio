import { BaseCardSkeletons } from "module/common/component/feedback/Skeletons/Skeletons";
import NftCard from "../../display/NftCard/NftCard";
import { PaginatedNftDto } from "module/api/service";
import { CollectionId, NftGridProps } from "./NftGrid.types";
import Grid from "module/common/component/layout/Grid/Grid";
import { useGetNftGridBreakpoints } from "./hook/useGetNftGridBreakpoints";
import useGetNftActiveTags from "./hook/useGetNftActiveTags";
import useGetCollectionOptions from "./hook/useGetCollectionOptions";
import useCleanCollections from "./hook/useCleanCollections";
import NftCollectionsSelectorGroup from "../../input/NftColletionsSelectorGroup/NftCollectionsSelectorGroup";
import { FiltersProvider } from "module/common/component/input/Filters/FiltersContext";

function InnerNftGrid({ loadingNfts, loadingCollections, collections, ...rest }: Omit<NftGridProps, "filters">): JSX.Element {
    const breakpoints = useGetNftGridBreakpoints();
    const tags = useGetNftActiveTags(collections || []);
    const collectionsOptions = useGetCollectionOptions(collections || []);
    const { cleanAllCollections, cleanCollection } = useCleanCollections();

    return (
        <Grid<PaginatedNftDto, CollectionId>
            filters={{
                ...(collections && {
                    content: <NftCollectionsSelectorGroup multiple loading={loadingCollections} options={collectionsOptions} />,
                }),
            }}
            onClearTags={cleanAllCollections}
            onTagClicked={cleanCollection}
            loading={loadingNfts}
            tags={tags}
            breakpoints={breakpoints}
            Skeletons={BaseCardSkeletons}
            {...rest}
        >
            {(nfts) => nfts.map((nft, key) => <NftCard nft={nft} key={key} loading={loadingNfts} />)}
        </Grid>
    );
}

function NftGrid({ filtersContext, ...rest }: NftGridProps) {
    return filtersContext ? (
        <FiltersProvider value={filtersContext}>
            <InnerNftGrid {...rest} />
        </FiltersProvider>
    ) : (
        <InnerNftGrid {...rest} />
    );
}

export default NftGrid;

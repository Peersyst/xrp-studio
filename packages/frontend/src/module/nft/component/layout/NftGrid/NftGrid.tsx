import { BaseCardSkeletons } from "module/common/component/feedback/Skeletons/Skeletons";
import NftCard from "../../display/NftCard/NftCard";
import { PaginatedNftDraftDto, PaginatedNftDto } from "module/api/service";
import { NftGridProps } from "./NftGrid.types";
import Grid from "module/common/component/layout/Grid/Grid";
import { useGetNftGridBreakpoints } from "./hook/useGetNftGridBreakpoints";
import useGetNftActiveTags from "./hook/useGetNftActiveTags";
import useGetCollectionOptions from "./hook/useGetCollectionOptions";
import useCleanCollections from "./hook/useCleanCollections";
import NftCollectionsSelectorGroup from "../../input/NftColletionsSelectorGroupFilter/NftCollectionsSelectorGroupFilter";
import { GridProps } from "module/common/component/layout/Grid/Grid.types";
import useNftsFilters from "module/nft/hook/useNftsFilters";
import useTranslate from "module/common/hook/useTranslate";

function InnerNftGrid({
    loading,
    ...rest
}: Omit<GridProps<PaginatedNftDto | PaginatedNftDraftDto, string>, "Skeletons" | "children" | "breakpoints">): JSX.Element {
    const breakpoints = useGetNftGridBreakpoints();

    return (
        <Grid<PaginatedNftDto | PaginatedNftDraftDto, string>
            breakpoints={breakpoints}
            loading={loading}
            Skeletons={BaseCardSkeletons}
            justifyItems="stretch"
            alignItems="flex-start"
            {...rest}
        >
            {(nfts) => nfts.map((nft, key) => <NftCard nft={nft} key={key} loading={loading} />)}
        </Grid>
    );
}

function InnerNftGridWithFilters({ loadingNfts, loadingCollections, collections, ...rest }: Omit<NftGridProps, "filters">): JSX.Element {
    const tags = useGetNftActiveTags(collections || []);
    const collectionsOptions = useGetCollectionOptions(collections || []);
    const { cleanAllCollections, cleanCollection } = useCleanCollections();
    const showCollections = collections && collections.length > 0;

    return (
        <InnerNftGrid
            withFilters
            filters={{
                ...(showCollections && {
                    content: <NftCollectionsSelectorGroup multiple loading={loadingCollections} options={collectionsOptions} />,
                }),
            }}
            onClearTags={cleanAllCollections}
            onDeleteTagClicked={cleanCollection}
            loading={loadingNfts}
            tags={tags}
            {...rest}
        />
    );
}

function NftGrid({ loadingNfts, withFilters, nothingToShow, ...rest }: NftGridProps): JSX.Element {
    const gridFilters = useNftsFilters();
    const translateError = useTranslate("error");

    const hasFilters = !!gridFilters.collections || !!gridFilters.query;
    return withFilters ? (
        <InnerNftGridWithFilters
            loadingNfts={loadingNfts}
            {...rest}
            nothingToShow={hasFilters ? translateError("noMatchingNftsWithFilters") : nothingToShow}
        />
    ) : (
        <InnerNftGrid loading={loadingNfts} {...rest} />
    );
}

export default NftGrid;

import { BaseCardSkeletons } from "module/common/component/feedback/Skeletons/Skeletons";
import NftCard from "../../display/NftCard/NftCard";
import { PaginatedNftDto } from "module/api/service";
import { CollectionId, NftGridProps } from "./NftGrid.types";
import Grid from "module/common/component/layout/Grid/Grid";
import { useGetNftGridBreakpoints } from "./hook/useGetNftGridBreakpoints";
import useGetNftTags from "./hook/useGetNftTags";
import useGetCollectionOptions from "./hook/useGetCollectionOptions";
import useCleanCollections from "./hook/useCleanCollections";
import NftCollectionsSelectorGroup from "../../input/NftColletionsSelectorGroup/NftCollectionsSelectorGroup";

function NftGrid({ loadingNfts, loadingCollections, collections = [], ...rest }: NftGridProps): JSX.Element {
    const breakpoints = useGetNftGridBreakpoints();
    const tags = useGetNftTags(collections);
    const collectionsOptions = useGetCollectionOptions(collections);
    const { cleanAllCollections, cleanCollection } = useCleanCollections();

    return (
        <Grid<PaginatedNftDto, CollectionId>
            filters={{
                content: <NftCollectionsSelectorGroup multiple loading={loadingCollections} options={collectionsOptions} />,
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

export default NftGrid;

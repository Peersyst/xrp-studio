import { CollectionNftsGridProps } from "module/nft/component/display/CollectionNftsGrid/CollectionNftsGrid.types";
import { useGetCollectionNfts } from "module/nft/query/useGetCollectionNfts";
import NftGrid from "module/nft/component/layout/NftGrid/NftGrid";
import NothingToShow from "module/common/component/feedback/NothingToShow/NothingToShow";
import useTranslate from "module/common/hook/useTranslate";

const CollectionNftsGrid = ({ id }: CollectionNftsGridProps): JSX.Element => {
    const translateError = useTranslate("error");
    const { data, hasNextPage, fetchNextPage, isFetching } = useGetCollectionNfts(id);

    return (
        <NftGrid
            data={data}
            callback={() => fetchNextPage({ cancelRefetch: false })}
            end={!hasNextPage}
            loadingNfts={isFetching}
            nothingToShow={<NothingToShow label={translateError("collectionDoesNotContainNfts")} />}
        />
    );
};

export default CollectionNftsGrid;

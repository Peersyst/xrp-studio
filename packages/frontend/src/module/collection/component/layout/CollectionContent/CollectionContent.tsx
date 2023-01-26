import NothingToShow from "module/common/component/feedback/NothingToShow/NothingToShow";
import PageContent from "module/common/component/layout/PageContent/PageContent";
import useTranslate from "module/common/hook/useTranslate";
import NftGrid from "module/nft/component/layout/NftGrid/NftGrid";
import { useGetCollectionNfts } from "module/nft/query/useGetCollectionNfts";
import { useParams } from "react-router-dom";
import useGetCollectionByPath from "module/collection/query/useGetCollectionByPath";

const CollectionContent = (): JSX.Element => {
    const translateError = useTranslate("error");
    const { path } = useParams<string>();
    const { data: collection, isLoading: collectionLoading } = useGetCollectionByPath(path);
    const { data, hasNextPage, fetchNextPage, isFetching } = useGetCollectionNfts(collection ? Number(collection.id) : undefined);

    return (
        <PageContent>
            <NftGrid
                data={data}
                callback={() => fetchNextPage({ cancelRefetch: false })}
                end={!hasNextPage}
                loadingNfts={collectionLoading || isFetching}
                nothingToShow={<NothingToShow label={translateError("collectionDoesNotContainNfts")} />}
            />
        </PageContent>
    );
};

export default CollectionContent;

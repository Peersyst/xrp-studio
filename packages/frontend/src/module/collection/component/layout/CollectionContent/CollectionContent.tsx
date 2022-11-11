import NothingToShow from "module/common/component/feedback/NothingToShow/NothingToShow";
import PageContent from "module/common/component/layout/PageContent/PageContent";
import useTranslate from "module/common/hook/useTranslate";
import NftGrid from "module/nft/component/layout/NftGrid/NftGrid";
import { useGetCollectionNfts } from "module/nft/query/useGetCollectionNfts";
import { useParams } from "react-router-dom";

const CollectionContent = (): JSX.Element => {
    const translateError = useTranslate("error");
    const { id } = useParams<string>();
    const { data, hasNextPage, fetchNextPage, isFetching } = useGetCollectionNfts(Number(id));
    return (
        <PageContent>
            <NftGrid
                data={data}
                callback={() => fetchNextPage({ cancelRefetch: false })}
                end={!hasNextPage}
                loadingNfts={isFetching}
                nothingToShow={<NothingToShow css={{ height: "12rem" }} label={translateError("collectionDoesNotContainNfts")} />}
            />
        </PageContent>
    );
};

export default CollectionContent;

import NothingToShow from "module/common/component/feedback/NothingToShow/NothingToShow";
import PageContent from "module/common/component/layout/PageContent/PageContent";
import useTranslate from "module/common/hook/useTranslate";
import NftGrid from "module/nft/component/layout/NftGrid/NftGrid";
import { useGetNftsByCollections } from "module/nft/query/useGetNftsByCollections";
import { useParams } from "react-router-dom";

const CollectionContent = (): JSX.Element => {
    const translateError = useTranslate("error");
    const { id } = useParams<string>();
    const { data, hasNextPage, fetchNextPage, isFetching } = useGetNftsByCollections(Number(id));
    return (
        <PageContent>
            <NftGrid
                data={data}
                callback={() => fetchNextPage({ cancelRefetch: false })}
                end={!hasNextPage}
                loadingNfts={isFetching}
                nothingToShow={<NothingToShow css={{ height: "12rem" }} label={translateError("collectionDoesNotNfts")}></NothingToShow>}
            />
        </PageContent>
    );
};

export default CollectionContent;

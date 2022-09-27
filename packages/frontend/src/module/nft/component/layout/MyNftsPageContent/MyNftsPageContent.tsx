import PageContent from "module/common/component/layout/PageContent/PageContent";
import { useGetMyNfts } from "module/nft/query/useGetMyNfts";
import NftGrid from "../NftGrid/NftGrid";

const MyNftsPageContent = (): JSX.Element => {
    const { data, hasNextPage, fetchNextPage, isFetching } = useGetMyNfts();
    return (
        <PageContent>
            <NftGrid data={data} callback={() => fetchNextPage({ cancelRefetch: false })} end={!hasNextPage} loading={isFetching} />
        </PageContent>
    );
};

export default MyNftsPageContent;

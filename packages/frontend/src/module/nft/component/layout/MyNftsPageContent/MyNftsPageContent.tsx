import PageContent from "module/common/component/layout/PageContent/PageContent";
import { useGetMyNfts } from "module/nft/query/useGetMyNfts";
import BaseNftsGrid from "../BaseNftGrid/BaseNftGrid";

const MyNftsPageContent = (): JSX.Element => {
    const { data, hasNextPage, fetchNextPage, isFetching } = useGetMyNfts();
    return (
        <PageContent>
            <BaseNftsGrid data={data} callback={() => fetchNextPage({ cancelRefetch: false })} end={!hasNextPage} loading={isFetching} />
        </PageContent>
    );
};

export default MyNftsPageContent;

import BasePage from "module/common/component/layout/BasePage/BasePage";
import PageContent from "module/common/component/layout/PageContent/PageContent";
import useWallet from "module/wallet/component/hooks/useWallet";
import BaseNftsGrid from "../component/layout/BaseNftGrid/BaseNftGrid";
import MyNftsPageHeader from "../component/layout/MyNftsPageHeader/MyNftsPageHeader";
import { useGetMyNfts } from "../query/useGetMyNfts";

const MyNftsPage = (): JSX.Element => {
    const { data, hasNextPage, fetchNextPage, isFetching } = useGetMyNfts();
    const { address } = useWallet();
    const emptyData = { pages: [], pageParams: [] };
    return (
        <BasePage>
            {{
                header: <MyNftsPageHeader />,
                content: (
                    <PageContent>
                        <BaseNftsGrid
                            data={address ? data : emptyData}
                            callback={() => fetchNextPage({ cancelRefetch: false })}
                            end={!hasNextPage}
                            loading={isFetching}
                        />
                    </PageContent>
                ),
            }}
        </BasePage>
    );
};

export default MyNftsPage;

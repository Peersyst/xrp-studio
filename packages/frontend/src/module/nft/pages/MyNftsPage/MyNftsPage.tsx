import SecondaryPage from "module/common/component/layout/SecondaryPage/SecondaryPage";
import useTranslate from "module/common/hook/useTranslate";
import BaseNftsGrid from "module/nft/component/layout/BaseNftGrid/BaseNftGrid";
import MyNftsPageHeader from "module/nft/component/layout/MyNftsPageHeader/MyNftsPageHeader";
import { useGetMyNfts } from "module/nft/query/useGetMyNfts";

const MyNftsPage = (): JSX.Element => {
    const t = useTranslate();
    const { data, hasNextPage, fetchNextPage, isFetching } = useGetMyNfts();
    return (
        <SecondaryPage title={t("myNfts")}>
            {{
                complement: <MyNftsPageHeader />,
                bottomComponent: <>Filters</>,
                content: (
                    <BaseNftsGrid
                        data={data}
                        callback={() => fetchNextPage({ cancelRefetch: false })}
                        end={!hasNextPage}
                        loading={isFetching}
                    />
                ),
            }}
        </SecondaryPage>
    );
};

export default MyNftsPage;

import { Row } from "@peersyst/react-components";
import Button from "module/common/component/input/Button/Button";
import SecondaryPage from "module/common/component/layout/SecondaryPage/SecondaryPage";
import useTranslate from "module/common/hook/useTranslate";
import BaseNftsGrid from "module/nft/component/layout/BaseNftGrid/BaseNftGrid";
import { useGetMyNfts } from "module/nft/query/useGetMyNfts";

const MyNftsPage = (): JSX.Element => {
    const t = useTranslate();
    const { data, hasNextPage, fetchNextPage, isFetching } = useGetMyNfts();

    return (
        <SecondaryPage title={t("myNfts")}>
            {{
                complement: (
                    <Row gap="1rem" wrap wrapGap="1rem">
                        <Button size="lg" variant="secondary" css={{ whiteSpace: "nowrap" }}>
                            {t("createCollection")}
                        </Button>
                        <Button size="lg" css={{ whiteSpace: "nowrap" }}>
                            {t("createNft")}
                        </Button>
                    </Row>
                ),
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

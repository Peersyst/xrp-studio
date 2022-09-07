import { Row } from "@peersyst/react-components";
import Button from "module/common/component/input/Button/Button";
import SecondaryPage from "module/common/component/layout/SecondaryPage/SecondaryPage";
import useTranslate from "module/common/hook/useTranslate";
import NftCard from "module/nft/component/display/NftCard/NftCard";
import BaseNftsGrid from "module/nft/component/layout/BaseNftGrid/BaseNftGrid";
import { useGetMyNfts } from "module/nft/query/useGetMyNfts";

const MyNftsPage = (): JSX.Element => {
    const t = useTranslate();
    const tErr = useTranslate("error");
    const { data, hasNextPage, fetchNextPage, isFetching } = useGetMyNfts();
    console.log(data);
    return (
        <SecondaryPage title={t("myNfts")}>
            {{
                complement: (
                    <Row gap="1rem" wrap wrapGap="1rem">
                        <Button size="lg" appearance="secondary" css={{ whiteSpace: "nowrap" }}>
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
                        nothingToShow={tErr("nothingToShow")}
                    >
                        {(nfts) => nfts.map((nft, key) => <NftCard nft={nft} key={key} loading={isFetching} />)}
                    </BaseNftsGrid>
                ),
            }}
        </SecondaryPage>
    );
};

export default MyNftsPage;

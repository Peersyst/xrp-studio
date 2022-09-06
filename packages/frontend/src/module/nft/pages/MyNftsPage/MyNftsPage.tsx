import { Row } from "@peersyst/react-components";
import Button from "module/common/component/input/Button/Button";
import SecondaryPage from "module/common/component/layout/SecondaryPage/SecondaryPage";
import useTranslate from "module/common/hook/useTranslate";
import NftCard from "module/nft/component/display/NftCard/NftCard";
import NftsGrid from "module/nft/component/layout/NftGrid/NftGrid";
import { useGetMyNfts } from "module/nft/query/useGetMyNfts";

const MyNftsPage = (): JSX.Element => {
    const t = useTranslate();
    const { data, hasNextPage, fetchNextPage, isFetching } = useGetMyNfts();
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
                    <NftsGrid
                        data={data}
                        callback={() => fetchNextPage({ cancelRefetch: false })}
                        end={!hasNextPage}
                        loading={true}
                        nothingToShowMessage={"nothing to show"}
                    >
                        {(nfts) => nfts.map((nft, key) => <NftCard nft={nft} key={key} loading={true} />)}
                    </NftsGrid>
                ),
            }}
        </SecondaryPage>
    );
};

export default MyNftsPage;

import { Row } from "@peersyst/react-components";
import Button from "module/common/component/input/Button/Button";
import SecondaryPage from "module/common/component/layout/SecondaryPage/SecondaryPage";
import useTranslate from "module/common/hook/useTranslate";
import NftsGrid from "module/nft/component/layout/NftGrid/NftGrid";
import NftCard from "module/nft/component/surface/NftCard/NftCard";
import { useGetMyNfts } from "module/nft/query/useGetMyNfts";
import ConnectXummButton from "module/wallet/component/input/ConnectXummButton/ConnectXummButton";

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
                bottomComponent: <>Hola Mundo</>,
                content: (
                    <>
                        <ConnectXummButton />
                        <NftsGrid
                            data={data}
                            callback={() => fetchNextPage({ cancelRefetch: false })}
                            end={!hasNextPage}
                            loading={true}
                            nothingToShowMessage={"nothing to show"}
                        >
                            {(nfts) => nfts.map((nft, key) => <NftCard nft={nft} key={key} loading={isFetching} />)}
                        </NftsGrid>
                    </>
                ),
            }}
        </SecondaryPage>
    );
};

export default MyNftsPage;

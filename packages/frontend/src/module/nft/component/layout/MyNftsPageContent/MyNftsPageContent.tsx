import PageContent from "module/common/component/layout/PageContent/PageContent";
import { useGetMyNfts } from "module/nft/query/useGetMyNfts";
import NftGrid from "../NftGrid/NftGrid";
import Button from "module/common/component/input/Button/Button";
import { NftRoutes } from "module/nft/NftRouter";
import NothingToShow from "module/common/component/feedback/NothingToShow/NothingToShow";
import { useNavigate } from "react-router-dom";
import useTranslate from "module/common/hook/useTranslate";

const MyNftsPageContent = (): JSX.Element => {
    const translate = useTranslate();
    const translateError = useTranslate("error");
    const navigate = useNavigate();
    const { data, hasNextPage, fetchNextPage, isFetching } = useGetMyNfts();

    return (
        <PageContent>
            <NftGrid
                data={data}
                callback={() => fetchNextPage({ cancelRefetch: false })}
                end={!hasNextPage}
                loadingNfts={isFetching}
                nothingToShow={
                    <NothingToShow css={{ height: "12rem" }} label={translateError("youHaveNoNfts")}>
                        <Button onClick={() => navigate(NftRoutes.NFT_CREATION)}>{translate("createNft")}</Button>
                    </NothingToShow>
                }
            />
        </PageContent>
    );
};

export default MyNftsPageContent;

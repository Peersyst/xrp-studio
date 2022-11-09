import NothingToShow from "module/common/component/feedback/NothingToShow/NothingToShow";
import Button from "module/common/component/input/Button/Button";
import PageContent from "module/common/component/layout/PageContent/PageContent";
import useTranslate from "module/common/hook/useTranslate";
import NftGrid from "module/nft/component/layout/NftGrid/NftGrid";
import { NftRoutes } from "module/nft/NftRouter";
import { useGetNftsByCollections } from "module/nft/query/useGetNftsByCollections";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

const CollectionContent = (): JSX.Element => {
    const translateError = useTranslate("error");
    const translate = useTranslate();
    const { id } = useParams<string>();
    const navigate = useNavigate();
    const { data, hasNextPage, fetchNextPage, isFetching } = useGetNftsByCollections(Number(id));
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

export default CollectionContent;

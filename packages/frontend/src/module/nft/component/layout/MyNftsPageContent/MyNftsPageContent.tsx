import PageContent from "module/common/component/layout/PageContent/PageContent";
import Button from "module/common/component/input/Button/Button";
import { NftRoutes } from "module/nft/NftRouter";
import NothingToShow from "module/common/component/feedback/NothingToShow/NothingToShow";
import { useNavigate } from "react-router-dom";
import useTranslate from "module/common/hook/useTranslate";
import MyNtfsGrid from "module/nft/component/display/MyNftsGrid/MyNtfsGrid";
import useNftsFilters, { NftsFilters } from "module/nft/hook/useNftsFilters";

const MyNftsPageContent = (): JSX.Element => {
    const translate = useTranslate();
    const translateError = useTranslate("error");
    const navigate = useNavigate();

    const filters: NftsFilters = useNftsFilters();

    return (
        <PageContent>
            <MyNtfsGrid
                nothingToShow={
                    <NothingToShow label={translateError("youHaveNoNfts")}>
                        <Button onClick={() => navigate(NftRoutes.NFT_CREATION)}>{translate("createNft")}</Button>
                    </NothingToShow>
                }
                {...filters}
            />
        </PageContent>
    );
};

export default MyNftsPageContent;

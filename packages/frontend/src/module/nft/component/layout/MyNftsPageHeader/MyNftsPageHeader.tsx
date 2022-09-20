import { Row } from "@peersyst/react-components";
import { CollectionRoutes } from "module/collection/CollectionRouter";
import Button from "module/common/component/input/Button/Button";
import useTranslate from "module/common/hook/useTranslate";
import { NftRoutes } from "module/nft/NftRouter";
import { useNavigate } from "react-router-dom";
import MyNftsSearch from "../../input/MyNftsSearch/MyNftsSearch";
import { MyNftsPageHeaderRoot } from "./MyNftsPageHeader.styles";

const MyNftsPageHeader = (): JSX.Element => {
    const t = useTranslate();
    const navigate = useNavigate();
    return (
        <MyNftsPageHeaderRoot
            title={t("myNfts")}
            complement={
                <Row gap="1rem" wrap wrapGap="1.5rem">
                    <Button onClick={() => navigate(CollectionRoutes.CREATE_COLLECTION)} size="lg" variant="secondary">
                        {t("createCollection")}
                    </Button>
                    <Button onClick={() => navigate(NftRoutes.CREATE_NFT)} size="lg">
                        {t("createNft")}
                    </Button>
                </Row>
            }
            stickyTitle={t("myNfts").toUpperCase()}
            footer={<MyNftsSearch />}
        />
    );
};

export default MyNftsPageHeader;

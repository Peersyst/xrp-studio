import { Row } from "@peersyst/react-components";
import { CollectionRoutes } from "module/collection/CollectionRouter";
import Button from "module/common/component/input/Button/Button";
import useTranslate from "module/common/hook/useTranslate";
import { NftRoutes } from "module/nft/NftRouter";
import { useNavigate } from "react-router-dom";
import MyNftsSearch from "../../input/MyNftsSearch/MyNftsSearch";
import { MyNftsPageHeaderRoot } from "./MyNftsPageHeader.styles";

const MyNftsPageHeader = (): JSX.Element => {
    const translate = useTranslate();
    const navigate = useNavigate();
    return (
        <MyNftsPageHeaderRoot
            title={translate("myNfts")}
            complement={
                <Row gap="1rem" wrap wrapGap="1.5rem">
                    <Button onClick={() => navigate(CollectionRoutes.CREATE_COLLECTION)} size="lg" variant="secondary">
                        {translate("createCollection")}
                    </Button>
                    <Button onClick={() => navigate(NftRoutes.NFT_CREATION)} size="lg">
                        {translate("createNft")}
                    </Button>
                </Row>
            }
            stickyTitle={translate("myNfts").toUpperCase()}
            footer={<MyNftsSearch />}
        />
    );
};

export default MyNftsPageHeader;

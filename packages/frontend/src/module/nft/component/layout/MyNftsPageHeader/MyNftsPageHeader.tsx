import { Row } from "@peersyst/react-components";
import Button from "module/common/component/input/Button/Button";
import useTranslate from "module/common/hook/useTranslate";
import { NftRoutes } from "module/nft/NftRouter";
import { useNavigate } from "react-router-dom";

const MyNftsPageHeader = (): JSX.Element => {
    const t = useTranslate();
    const navigate = useNavigate();
    return (
        <Row gap="1rem" wrap wrapGap="1rem">
            <Button onClick={() => navigate(NftRoutes.CREATE_COLLECTION)} size="lg" appearance="secondary" css={{ whiteSpace: "nowrap" }}>
                {t("createCollection")}
            </Button>
            <Button onClick={() => navigate(NftRoutes.CREAT_NFT)} size="lg" css={{ whiteSpace: "nowrap" }}>
                {t("createNft")}
            </Button>
        </Row>
    );
};

export default MyNftsPageHeader;

import MainPageHeader from "module/common/component/layout/MainPageHeader/MainPageHeader";
import useTranslate from "module/common/hook/useTranslate";
import { useNavigate } from "react-router-dom";
import { CollectionRoutes } from "module/collection/CollectionRouter";
import { Row } from "@peersyst/react-components";
import Button from "module/common/component/input/Button/Button";

const MyCollectionsPageHeader = (): JSX.Element => {
    const translate = useTranslate();
    const navigate = useNavigate();
    return (
        <MainPageHeader
            title={translate("myCollections")}
            complement={
                <Row>
                    <Button onClick={() => navigate(CollectionRoutes.CREATE_COLLECTION)} size="lg" variant="primary">
                        {translate("createCollection")}
                    </Button>
                </Row>
            }
            stickyTitle={translate("myCollections").toUpperCase()}
        />
    );
};

export default MyCollectionsPageHeader;

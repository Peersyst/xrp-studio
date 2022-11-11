import MainPageHeader from "module/common/component/layout/MainPageHeader/MainPageHeader";
import useTranslate from "module/common/hook/useTranslate";
import { useNavigate } from "react-router-dom";
import { CollectionRoutes } from "module/collection/CollectionRouter";
import Button from "module/common/component/input/Button/Button";
import { MainPageHeaderSearchBar } from "module/common/component/layout/MainPageHeader/MainPageHeader.styles";

const MyCollectionsPageHeader = (): JSX.Element => {
    const translate = useTranslate();
    const navigate = useNavigate();

    return (
        <MainPageHeader
            title={translate("myCollections")}
            complement={
                <Button onClick={() => navigate(CollectionRoutes.CREATE_COLLECTION)} size="lg" variant="primary">
                    {translate("createCollection")}
                </Button>
            }
            stickyTitle={translate("myCollections").toUpperCase()}
            footer={<MainPageHeaderSearchBar />}
        />
    );
};

export default MyCollectionsPageHeader;

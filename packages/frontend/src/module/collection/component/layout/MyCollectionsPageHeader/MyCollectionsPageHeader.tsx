import MainPageHeader from "module/common/component/layout/MainPageHeader/MainPageHeader";
import useTranslate from "module/common/hook/useTranslate";
import { useNavigate } from "react-router-dom";
import { CollectionRoutes } from "module/collection/CollectionRouter";
import Button from "module/common/component/input/Button/Button";
import { useResetRecoilState } from "recoil";
import collectionCreationState from "module/collection/state/CollectionCreationState";

const MyCollectionsPageHeader = (): JSX.Element => {
    const translate = useTranslate();
    const navigate = useNavigate();
    const resetCollectionCreationState = useResetRecoilState(collectionCreationState);

    const goToCreateCollection = () => {
        resetCollectionCreationState();
        navigate(CollectionRoutes.CREATE_COLLECTION);
    };

    return (
        <MainPageHeader
            title={translate("myCollections")}
            complement={
                <Button onClick={goToCreateCollection} size="lg" variant="primary">
                    {translate("createCollection")}
                </Button>
            }
            stickyTitle={translate("myCollections").toUpperCase()}
        />
    );
};

export default MyCollectionsPageHeader;

import useTranslate from "module/common/hook/useTranslate";
import MainPageHeader from "module/common/component/layout/MainPageHeader/MainPageHeader";
import Button from "module/common/component/input/Button/Button";
import { EditCollectionNftDraftHeaderProps } from "module/collection/component/layout/EditCollectionNftDraftHeader/EditCollectionNftDraftHeader.types";
import useCollectionCreationState from "module/collection/hook/useCollectionCreationState";
import { CollectionRoutes } from "module/collection/router/CollectionRouter";

const EditCollectionNftDraftHeader = ({ saving }: EditCollectionNftDraftHeaderProps): JSX.Element => {
    const translate = useTranslate();

    const [{ id }] = useCollectionCreationState();

    return (
        <MainPageHeader
            title={translate("editCollectionNft")}
            back
            backIconSize="md"
            complement={
                <Button type="submit" loading={saving}>
                    {translate("saveChanges")}
                </Button>
            }
            backPath={CollectionRoutes.CREATE_COLLECTION + (id ? `?id=${id}` : "")}
        />
    );
};

export default EditCollectionNftDraftHeader;

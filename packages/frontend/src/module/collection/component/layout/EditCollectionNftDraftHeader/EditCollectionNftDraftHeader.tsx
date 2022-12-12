import useTranslate from "module/common/hook/useTranslate";
import MainPageHeader from "module/common/component/layout/MainPageHeader/MainPageHeader";
import Button from "module/common/component/input/Button/Button";
import { EditCollectionNftDraftHeaderProps } from "module/collection/component/layout/EditCollectionNftDraftHeader/EditCollectionNftDraftHeader.types";
import { CollectionRoutes } from "module/collection/CollectionRouter";
import useCollectionCreationState from "module/collection/hook/useCollectionCreationState";

const EditCollectionNftDraftHeader = ({ saving }: EditCollectionNftDraftHeaderProps): JSX.Element => {
    const translate = useTranslate();
    const [{ id }] = useCollectionCreationState();

    return (
        <MainPageHeader
            title={translate("editCollectionNft")}
            back
            backIconSize="md"
            backPath={CollectionRoutes.CREATE_COLLECTION + (id ? `?id=${id}` : "")}
            complement={
                <Button type="submit" loading={saving}>
                    {translate("saveChanges")}
                </Button>
            }
        />
    );
};

export default EditCollectionNftDraftHeader;

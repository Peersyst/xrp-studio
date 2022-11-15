import useTranslate from "module/common/hook/useTranslate";
import MainPageHeader from "module/common/component/layout/MainPageHeader/MainPageHeader";
import Button from "module/common/component/input/Button/Button";
import { CollectionRoutes } from "module/collection/CollectionRouter";
import { EditCollectionNftDraftHeaderProps } from "module/collection/component/layout/EditCollectionNftDraftHeader/EditCollectionNftDraftHeader.types";

const EditCollectionNftDraftHeader = ({ saving }: EditCollectionNftDraftHeaderProps): JSX.Element => {
    const translate = useTranslate();

    return (
        <MainPageHeader
            title={translate("editCollectionNft")}
            back
            backIconSize="md"
            backPath={CollectionRoutes.CREATE_COLLECTION}
            complement={
                <Button type="submit" loading={saving}>
                    {translate("saveChanges")}
                </Button>
            }
        />
    );
};

export default EditCollectionNftDraftHeader;

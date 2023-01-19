import { CollectionCreationNftDraftHeaderProps } from "module/collection/component/layout/CollectionCreationNftDraftPageScaffold/CollectionCreationNftDraftHeader/CollectionCreationNftDraftHeader.types";
import useTranslate from "module/common/hook/useTranslate";
import MainPageHeader from "module/common/component/layout/MainPageHeader/MainPageHeader";
import Button from "module/common/component/input/Button/Button";

const CollectionCreationNftDraftHeader = ({
    backPath,
    saving = false,
    loading = false,
}: CollectionCreationNftDraftHeaderProps): JSX.Element => {
    const translate = useTranslate();

    return (
        <MainPageHeader
            title={translate("editCollectionNft")}
            back
            backIconSize="md"
            complement={
                <Button type="submit" loading={saving} disabled={loading}>
                    {translate("saveChanges")}
                </Button>
            }
            backPath={backPath}
        />
    );
};

export default CollectionCreationNftDraftHeader;

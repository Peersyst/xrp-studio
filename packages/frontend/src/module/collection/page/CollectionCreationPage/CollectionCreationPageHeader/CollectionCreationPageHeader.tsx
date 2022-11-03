import { useSearchParams } from "react-router-dom";
import MainPageHeader from "module/common/component/layout/MainPageHeader/MainPageHeader";
import useTranslate from "module/common/hook/useTranslate";
import { Row } from "@peersyst/react-components";
import Button from "module/common/component/input/Button/Button";
import { CollectionCreationPageHeaderProps } from "./CollectionCreationPageHeader.types";
import useGoBack from "module/common/hook/useGoBack";

const CollectionCreationPageHeader = ({ loading, saving, publishing }: CollectionCreationPageHeaderProps): JSX.Element => {
    const translate = useTranslate();
    const goBack = useGoBack();
    const [searchParams] = useSearchParams();

    const isEdition = !!searchParams.get("id");

    const disableCancel = loading || saving || publishing;

    return (
        <MainPageHeader
            title={isEdition ? translate("editCollection") : translate("createCollection")}
            complement={
                <Row gap="1rem" wrap wrapGap="1.5rem">
                    <Button size="lg" variant="secondary" disabled={disableCancel} onClick={goBack}>
                        {translate("cancel")}
                    </Button>
                    <Button size="lg" type="submit" action="save" loading={saving} disabled={loading || publishing}>
                        {translate("save")}
                    </Button>
                    <Button size="lg" type="submit" action="publish" loading={publishing} disabled={loading || saving}>
                        {translate("publish")}
                    </Button>
                </Row>
            }
        />
    );
};

export default CollectionCreationPageHeader;

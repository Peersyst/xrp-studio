import MainPageHeader from "module/common/component/layout/MainPageHeader/MainPageHeader";
import useTranslate from "module/common/hook/useTranslate";
import { Row } from "@peersyst/react-components";
import Button from "module/common/component/input/Button/Button";
import useGoBack from "module/common/hook/useGoBack";

const DropCreationPageHeader = (): JSX.Element => {
    const translate = useTranslate();
    const goBack = useGoBack();

    return (
        <MainPageHeader
            back
            backIconSize="md"
            title={translate("customizeDropPage")}
            complement={
                <Row gap="1rem" wrap wrapGap="1.5rem">
                    <Button size="lg" variant="secondary" onClick={goBack}>
                        {translate("cancel")}
                    </Button>
                    <Button size="lg" type="submit" action="launch">
                        {translate("launchDrop")}
                    </Button>
                </Row>
            }
        />
    );
};

export default DropCreationPageHeader;

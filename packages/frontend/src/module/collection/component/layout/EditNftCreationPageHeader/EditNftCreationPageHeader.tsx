import useTranslate from "module/common/hook/useTranslate";
import MainPageHeader from "module/common/component/layout/MainPageHeader/MainPageHeader";
import { Row } from "@peersyst/react-components";
import Button from "module/common/component/input/Button/Button";

const EditNftCreationPageHeader = () => {
    const translate = useTranslate();

    return (
        <MainPageHeader
            title={translate("editNft")}
            back
            backIconSize="md"
            complement={
                <Row>
                    <Button type="submit">{translate("saveChanges")}</Button>
                </Row>
            }
        />
    );
};

export default EditNftCreationPageHeader;

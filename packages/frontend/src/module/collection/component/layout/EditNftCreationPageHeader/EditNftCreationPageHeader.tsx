import { useTranslate } from "@peersyst/react-components";
import { MainPageHeader } from "module/common/component/layout/PageHeader/PageHeader.styles";

const EditNftCreationPageHeader = () => {
    const translate = useTranslate();

    return (
        <MainPageHeader
            title={translate("editNft")}
        />
    )
}

export default  EditNftCreationPageHeader;

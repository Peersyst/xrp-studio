import { Row } from "@peersyst/react-components";
import Button from "module/common/component/input/Button/Button";
import BasePageHeader from "module/common/component/layout/BasePageHeader/BasePageHeader";
import useTranslate from "module/common/hook/useTranslate";
import MyNftsPageHeaderFooter from "./MyNftsPageHeaderFooter";

const MyNftsPageHeader = (): JSX.Element => {
    const t = useTranslate();
    return (
        <BasePageHeader
            title={t("myNfts")}
            complement={
                <Row gap="1rem">
                    <Button size="lg" variant="secondary">
                        {t("createCollection")}
                    </Button>
                    <Button size="lg">{t("createNft")}</Button>
                </Row>
            }
            footer={<MyNftsPageHeaderFooter />}
        />
    );
};

export default MyNftsPageHeader;

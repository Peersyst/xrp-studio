import { Row } from "@peersyst/react-components";
import Button from "module/common/component/input/Button/Button";
import useTranslate from "module/common/hook/useTranslate";
import MyNftsSearch from "../../input/MyNftsSearch/MyNftsSearch";
import { MyNftsPageHeaderRoot } from "./MyNftsPageHeader.styles";

const MyNftsPageHeader = (): JSX.Element => {
    const t = useTranslate();

    return (
        <MyNftsPageHeaderRoot
            title={t("myNfts")}
            complement={
                <Row gap="1rem" wrap wrapGap="1.5rem">
                    <Button size="lg" variant="secondary">
                        {t("createCollection")}
                    </Button>
                    <Button size="lg">{t("createNft")}</Button>
                </Row>
            }
            footer={<MyNftsSearch />}
        />
    );
};

export default MyNftsPageHeader;

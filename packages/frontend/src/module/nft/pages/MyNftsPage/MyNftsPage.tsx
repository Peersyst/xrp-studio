import { Row } from "@peersyst/react-components";
import Button from "module/common/component/input/Button/Button";
import SecondaryPage from "module/common/component/layout/SecondaryPage/SecondaryPage";
import useTranslate from "module/common/hook/useTranslate";

const MyNftsPage = (): JSX.Element => {
    const t = useTranslate();
    return (
        <SecondaryPage
            title={t("myNfts")}
            complement={
                <Row gap="1rem" wrap wrapGap="1rem">
                    <Button size="lg" appearance="secondary" css={{ whiteSpace: "nowrap" }}>
                        {t("createCollection")}
                    </Button>
                    <Button size="lg" css={{ whiteSpace: "nowrap" }}>
                        {t("createNft")}
                    </Button>
                </Row>
            }
            bottomComponent={<>Hola Mundo</>}
        >
            <div style={{ height: "300vh" }}></div>
        </SecondaryPage>
    );
};

export default MyNftsPage;

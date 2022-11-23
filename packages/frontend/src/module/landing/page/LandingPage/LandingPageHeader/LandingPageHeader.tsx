import { Col, Typography } from "@peersyst/react-components";
import Nebula from "module/common/component/display/Nebula/Nebula";
import useTranslate from "module/common/hook/useTranslate";
import { BaseButton, BaseDescription, BaseTitle, BaseLandingPageHeader, BaseLandingPageRoot } from "./LandingPageHeader.styles";

const LandingPageHeader = (): JSX.Element => {
    const translate = useTranslate();
    return (
        <BaseLandingPageRoot>
            <Nebula height="16.125rem" alt="header" />
            <BaseLandingPageHeader showStickyTitle={false}>
                <Col gap="3rem" alignItems={"center"} className={"ContentHeader"}>
                    <Col gap="1.5rem">
                        <BaseTitle variant="h2">{translate("createAndManageNft")}</BaseTitle>
                        <BaseDescription variant="h5" fontWeight={400}>
                            {translate("landingHeaderDescription")}
                        </BaseDescription>
                    </Col>
                    <BaseButton>
                        <Typography variant="h5" fontWeight={500}>
                            {translate("startCreatingNow")}
                        </Typography>
                    </BaseButton>
                </Col>
            </BaseLandingPageHeader>
        </BaseLandingPageRoot>
    );
};

export default LandingPageHeader;

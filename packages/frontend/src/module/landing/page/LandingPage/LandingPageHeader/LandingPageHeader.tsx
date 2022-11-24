import { Col, Typography } from "@peersyst/react-components";
import Nebula from "module/common/component/display/Nebula/Nebula";
import useTranslate from "module/common/hook/useTranslate";
import { BaseButton, LandingPageHeaderRoot } from "./LandingPageHeader.styles";

const LandingPageHeader = (): JSX.Element => {
    const translate = useTranslate();
    return (
        <LandingPageHeaderRoot>
            <Col css={{ width: "100%", zIndex: -1, position: "absolute", top: 0 }}>
                <Nebula height="16.125rem" alt="header" css={{ width: "100vw" }} />
            </Col>
            <Col css={{ maxWidth: "37.5rem" }} gap="3rem" alignItems="center">
                <Typography variant="h2" fontWeight="800" color="black.0" textAlign="center" className="title">
                    {translate("createAndManageNft")}
                </Typography>
                <Typography variant="h5" fontWeight="400" color="black.40" textAlign="center" className="subtitle">
                    {translate("landingHeaderDescription")}
                </Typography>
                <BaseButton size="lg">{translate("startCreatingNow")}</BaseButton>
            </Col>
        </LandingPageHeaderRoot>
    );
};

export default LandingPageHeader;

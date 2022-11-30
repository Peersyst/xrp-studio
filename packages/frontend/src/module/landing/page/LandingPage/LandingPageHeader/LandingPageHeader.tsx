import { Col, Typography } from "@peersyst/react-components";
import Nebula from "module/common/component/display/Nebula/Nebula";
import Button from "module/common/component/input/Button/Button";
import useTranslate from "module/common/hook/useTranslate";
import { LandingPageHeaderRoot } from "./LandingPageHeader.styles";

const LandingPageHeader = (): JSX.Element => {
    const translate = useTranslate();
    return (
        <LandingPageHeaderRoot>
            <Nebula height="16.125rem" alt="header" css={{ width: "100%", zIndex: -1, position: "absolute", top: 0 }} />
            <Col css={{ maxWidth: "37.5rem" }} gap="2rem" alignItems="center">
                <Typography variant="h2" fontWeight="800" color="black.0" textAlign="center" className="title">
                    {translate("createAndManageNft")}
                </Typography>
                <Col gap="3rem" alignItems="center">
                    <Typography variant="h5" fontWeight="400" color="black.40" textAlign="center" className="subtitle">
                        {translate("landingHeaderDescription")}
                    </Typography>
                    <Button size="xl" variant="rainbow">
                        {translate("startCreatingNow")}
                    </Button>
                </Col>
            </Col>
        </LandingPageHeaderRoot>
    );
};

export default LandingPageHeader;

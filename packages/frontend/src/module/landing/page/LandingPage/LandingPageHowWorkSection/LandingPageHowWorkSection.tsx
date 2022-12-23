import { Col, Typography } from "@peersyst/react-components";
import Nebula from "module/common/component/display/Nebula/Nebula";
import useTranslate from "module/common/hook/useTranslate";
import HowWorkCardCarousel from "module/landing/display/HowWorkCardCarousel/HowWorkCardCarousel";
import { LandingPageSectionRoot } from "../LandingPage.styles";
import { LandingPageHowWorkSectionRoot } from "./LandingPageHowWorkSection.styles";
import { LandingPageHowWorkSectionProps } from "./LandingPageHowWorkSection.types";

const LandingPageHowWorkSection = ({ items, loading = false, ...rest }: LandingPageHowWorkSectionProps): JSX.Element => {
    const translate = useTranslate();
    return (
        <LandingPageHowWorkSectionRoot>
            <Col css={{ width: "100%", zIndex: -1, position: "absolute", top: 0 }}>
                <Nebula variant="rotate" height="55rem" alt="header" />
            </Col>
            <LandingPageSectionRoot as={Col} gap="3rem" {...rest} css={{ position: "relative" }}>
                <Typography variant="h3" fontWeight={800} textAlign="center">
                    {translate("howItWorks")}
                </Typography>
                <HowWorkCardCarousel items={items} loading={loading} />
            </LandingPageSectionRoot>
        </LandingPageHowWorkSectionRoot>
    );
};

export default LandingPageHowWorkSection;

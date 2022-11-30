import { Col, Row, Typography } from "@peersyst/react-components";
import useTranslate from "module/common/hook/useTranslate";
import PartnersCard from "module/landing/display/PartnersCard/PartnersCard";
import { LandingPageSectionRoot } from "../LandingPage.styles";
import { LandingPagePartnersSectionProps, PARTNERS } from "./LandingPagePartnersSection.types";

const LandingPagePartnersSection = ({ ...rest }: LandingPagePartnersSectionProps): JSX.Element => {
    const translate = useTranslate();
    return (
        <LandingPageSectionRoot as={Col} gap="3rem" {...rest} css={{ position: "relative" }}>
            <Typography variant="h3" fontWeight={800} textAlign="center">
                {translate("ourPartners")}
            </Typography>
            <Row gap={"1.5rem"} className={"ContentPartners"}>
                {PARTNERS.map((partner) => (
                    <PartnersCard partner={partner} />
                ))}
            </Row>
        </LandingPageSectionRoot>
    );
};

export default LandingPagePartnersSection;

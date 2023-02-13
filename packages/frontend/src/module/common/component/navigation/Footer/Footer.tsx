import { Col, Row, Typography } from "@peersyst/react-components";
import Logo from "module/common/component/display/Logo/Logo";
import { config } from "config";
import { ContentFooter, FooterRoot } from "./Footer.styles";
import { FooterProps } from "./Footer.types";
import useTranslate from "module/common/hook/useTranslate";
import FooterColumn from "./FooterColumn";
import Nebula from "../../display/Nebula/Nebula";
import { FOOTER_SECTIONS } from "./footerSections";
import AppLinksWithLogos from "../AppLinks/AppLinksWithLogos";

const Footer = ({ className, ...rest }: FooterProps): JSX.Element => {
    const translate = useTranslate();

    return (
        <FooterRoot className={className}>
            <Col css={{ width: "100%", zIndex: -1, position: "absolute", top: 0 }}>
                <Nebula height="16.125rem" alt="header" rotate="rotate(180deg)" />
            </Col>
            <ContentFooter>
                <Row
                    gap="6rem"
                    {...rest}
                    css={{ position: "relative", paddingTop: "3rem", marginBottom: "10rem" }}
                    className={"ContentFooter"}
                >
                    <Col gap="1.5rem" justifyContent="space-between" flex={1}>
                        <Logo />
                        <Col gap={"0.75rem"}>
                            <AppLinksWithLogos googlePlayLink={config.xrpStudioGooglePlayLink} appStoreLink={config.xrpStudioApStoreLink} />
                        </Col>
                        <Col gap={"0.5rem"}>
                            <Typography variant="body2" color="blue.40">
                                {config.peersystEmail}
                            </Typography>
                            <Typography variant="body2" color="black.0" light>
                                {`@ ${new Date().getFullYear()} ${config.peersyst}`}
                            </Typography>
                        </Col>
                    </Col>
                    {FOOTER_SECTIONS.map(({ title, items }, index) => {
                        return (
                            <Col gap={"1.5rem"} flex={1} key={index}>
                                <Typography variant="h5" fontWeight={500}>
                                    {translate(title)}
                                </Typography>
                                <FooterColumn links={items} />
                            </Col>
                        );
                    })}
                </Row>
            </ContentFooter>
        </FooterRoot>
    );
};

export default Footer;

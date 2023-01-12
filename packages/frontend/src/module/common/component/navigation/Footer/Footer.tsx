import { Col, Row, Typography, useConfig } from "@peersyst/react-components";
import Logo from "module/common/component/display/Logo/Logo";
import { config } from "config";
import { ContentFooter, FooterRoot } from "./Footer.styles";
import { FooterProps, FOOTER_LINK } from "./Footer.types";
import useTranslate from "module/common/hook/useTranslate";
import FooterColumn from "./FooterColumn";
import Nebula from "../../display/Nebula/Nebula";
import Link from "module/common/component/navigation/Link/Link";

const Footer = ({ className, ...rest }: FooterProps): JSX.Element => {
    const translate = useTranslate();
    const altNetwork = useConfig("altNetwork");

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
                    <Col gap="1rem" justifyContent="space-between" flex={1}>
                        <Logo />
                        <Col gap={"0.5rem"}>
                            <Typography variant="body2" color="blue.40">
                                {config.peersystEmail}
                            </Typography>
                            <Typography variant="body2" color="black.0" light>
                                {`@ ${new Date().getFullYear()} ${config.peersyst}`}
                            </Typography>
                        </Col>
                        <Link to={altNetwork.url} css={{ width: "fit-content" }}>
                            {translate("goTo", { destination: altNetwork.network })}
                        </Link>
                    </Col>

                    <Col gap={"1.5rem"} flex={1}>
                        <Typography variant="h5" fontWeight={500}>
                            {translate("learnMore")}
                        </Typography>
                        <FooterColumn links={FOOTER_LINK[0]} />
                    </Col>
                    <Col gap={"1.5rem"} flex={1}>
                        <Typography variant="h5" fontWeight={500}>
                            {translate("getInvolved")}
                        </Typography>
                        <FooterColumn links={FOOTER_LINK[1]} />
                    </Col>
                    <Col gap={"1.5rem"} flex={1}>
                        <Typography variant="h5" fontWeight={500}>
                            {translate("connect")}
                        </Typography>
                        <FooterColumn links={FOOTER_LINK[2]} />
                    </Col>
                </Row>
            </ContentFooter>
        </FooterRoot>
    );
};

export default Footer;

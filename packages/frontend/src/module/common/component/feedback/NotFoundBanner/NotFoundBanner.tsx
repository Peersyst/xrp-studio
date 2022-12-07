import { Col, Image, Row, Typography } from "@peersyst/react-components";
import { logo } from "images";
import useTranslate from "module/common/hook/useTranslate";

const NotFoundBanner = (): JSX.Element => {
    const translateError = useTranslate("error");

    return (
        <Row gap="2rem">
            <Col flex={1} alignItems="center" justifyContent="center">
                <Image src={logo} alt="xrp-studio-logo" />
            </Col>
            <Col flex={1} gap="1rem">
                <Typography variant="h3" fontWeight={700}>
                    404 {translateError("notFound")}
                </Typography>
                <Typography variant="body1" fontWeight={500} color="black.40">
                    {translateError("content404")}
                </Typography>
            </Col>
        </Row>
    );
};

export default NotFoundBanner;

import { Col, Row } from "@peersyst/react-components";
import { logo } from "images";
import useTranslate from "module/common/hook/useTranslate";
import PageContent from "module/common/component/layout/PageContent/PageContent";
import { BannerImage, BannerTypography } from "module/common/component/feedback/NotFoundBanner/NotFoundBanner.styles";

const NotFoundBanner = (): JSX.Element => {
    const translateError = useTranslate("error");

    return (
        <PageContent css={{ padding: "14rem 1rem 12rem" }}>
            <Row gap="2rem" alignItems="center" breakpoint={{ width: "mobile", alignItems: "center", gap: "2rem" }}>
                <Col flex={1} alignItems="flex-end">
                    <BannerImage src={logo} alt="xrp-studio-logo" />
                </Col>
                <Col flex={1} gap="1rem">
                    <BannerTypography variant="h3" fontWeight={700}>
                        404 {translateError("notFound")}
                    </BannerTypography>
                    <BannerTypography variant="body1" fontWeight={500} color="black.40">
                        {translateError("content404")}
                    </BannerTypography>
                </Col>
            </Row>
        </PageContent>
    );
};

export default NotFoundBanner;

import { Col, Row, Skeleton, Typography, WithLoading } from "@peersyst/react-components";
import useTranslate from "module/common/hook/useTranslate";
import DropLandingLabel from "module/drop/component/display/DropLanding/DropLandingLabel/DropLandingLabel";
import {
    DropLandingDescriptionSectionContent,
    DropLandingDescriptionSectionRoot,
    DropLandingImage,
} from "module/drop/component/display/DropLanding/DropLandingDescriptionSection/DropLandingDescriptionSection.styles";
import { useFormatNumber } from "module/common/hook/useFormatNumber";
import { XrpIcon } from "icons";
import { DropLandingDescriptionSectionProps } from "module/drop/component/display/DropLanding/DropLandingDescriptionSection/DropLandingDescriptionSection.types";
import DropLandingDescription from "module/drop/component/display/DropLanding/DropLandingDescriptionSection/DropLandingDescription";

const DropLandingDescriptionSection = ({
    cover = "",
    image,
    name = "Loading Name",
    description = "Loading Description",
    items,
    sold,
    sales = "0",
    fontLuminance,
    loading = false,
}: WithLoading<DropLandingDescriptionSectionProps>): JSX.Element => {
    const translate = useTranslate();
    const formatNumber = useFormatNumber();

    return (
        <DropLandingDescriptionSectionRoot cover={cover} fontLuminance={fontLuminance}>
            <DropLandingDescriptionSectionContent>
                <Col flex={1} justifyContent="space-between" gap="3.5rem" css={{ padding: "3.375rem 0" }}>
                    <Col gap="0.625rem">
                        <Skeleton loading={loading}>
                            <Typography variant="h3" fontWeight={800}>
                                {name}
                            </Typography>
                        </Skeleton>
                        <DropLandingDescription description={description} loading={loading} />
                    </Col>
                    <Row gap="3rem">
                        <DropLandingLabel variant="body2" label={translate("items")} loading={loading}>
                            {items}
                        </DropLandingLabel>
                        <DropLandingLabel variant="body2" label={translate("sold")} loading={loading}>
                            {sold}
                        </DropLandingLabel>
                        <DropLandingLabel variant="body2" label={translate("sales")} loading={loading}>
                            <Row gap="0.5rem" alignItems="center">
                                <XrpIcon />
                                {formatNumber(sales)}
                            </Row>
                        </DropLandingLabel>
                    </Row>
                </Col>
                <Row flex={1} alignItems="center" justifyContent="flex-end" breakpoint={{ width: "dropLandingPage" }}>
                    <DropLandingImage src={image} alt={`${name}-image`} loading={loading} />
                </Row>
            </DropLandingDescriptionSectionContent>
        </DropLandingDescriptionSectionRoot>
    );
};

export default DropLandingDescriptionSection;

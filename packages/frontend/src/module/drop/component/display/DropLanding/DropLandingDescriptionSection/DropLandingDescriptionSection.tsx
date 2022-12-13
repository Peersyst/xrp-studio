import { Col, Row, Skeleton, Typography, WithLoading } from "@peersyst/react-components";
import useTranslate from "module/common/hook/useTranslate";
import DropLandingLabel from "module/drop/component/display/DropLanding/DropLandingLabel/DropLandingLabel";
import {
    DropLandingDescriptionSectionContent,
    DropLandingDescriptionSectionRoot,
    DropLandingImage,
    MintProgress,
} from "module/drop/component/display/DropLanding/DropLandingDescriptionSection/DropLandingDescriptionSection.styles";
import { useFormatNumber } from "module/common/hook/useFormatNumber";
import { DropLandingDescriptionSectionProps } from "module/drop/component/display/DropLanding/DropLandingDescriptionSection/DropLandingDescriptionSection.types";
import { XrpIcon } from "icons";
import Description from "module/common/component/display/Desciption/Description";
import ButtonBuyNftDrop from "module/drop/component/input/ButtonBuyNftDrop/ButtonBuyNftDrop";
import { dropsToXrp } from "xrpl";

const DropLandingDescriptionSection = ({
    cover = "",
    image = "",
    name = "Loading Name",
    description = "Loading Description",
    items,
    price = "0",
    sold = 0,
    loading = false,
    dropId,
    preview = false,
}: WithLoading<DropLandingDescriptionSectionProps>): JSX.Element => {
    const translate = useTranslate();
    const formatNumber = useFormatNumber();

    return (
        <DropLandingDescriptionSectionRoot cover={cover}>
            <DropLandingDescriptionSectionContent>
                <Col flex={1} justifyContent="space-between" gap="3.5rem" css={{ padding: "3.375rem 0" }}>
                    <Col gap="0.625rem">
                        <Skeleton loading={loading}>
                            <Typography variant="h3" fontWeight={800}>
                                {name}
                            </Typography>
                        </Skeleton>
                        <Description loading={loading} variant="body2" light css={{ lineHeight: "1.5rem" }}>
                            {description}
                        </Description>
                    </Col>
                    <Col gap="1rem" css={{ width: "fit-content" }}>
                        <Row gap="2rem" css={{ width: "fit-content" }} wrap wrapGap="1rem">
                            <DropLandingLabel variant="body2" label={translate("items")} loading={loading}>
                                {items}
                            </DropLandingLabel>
                            <DropLandingLabel variant="body2" label={translate("sold")} loading={loading}>
                                {sold}
                            </DropLandingLabel>
                            <DropLandingLabel variant="body2" label={translate("sales")} loading={loading}>
                                <Row gap="0.5rem" alignItems="center">
                                    <XrpIcon />
                                    {formatNumber((Number(dropsToXrp(price)) * sold).toString())}
                                </Row>
                            </DropLandingLabel>
                            <ButtonBuyNftDrop dropId={dropId!} disabled={preview} />
                        </Row>
                        <MintProgress value={20} />
                    </Col>
                </Col>
                <Row flex={1} alignItems="center" justifyContent="flex-end" breakpoint={{ width: "dropLandingPage" }}>
                    <DropLandingImage src={image} alt={`${name}-image`} loading={loading} />
                </Row>
            </DropLandingDescriptionSectionContent>
        </DropLandingDescriptionSectionRoot>
    );
};

export default DropLandingDescriptionSection;

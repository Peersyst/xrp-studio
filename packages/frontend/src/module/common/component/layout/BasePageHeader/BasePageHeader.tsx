import { Col, Row, Typography } from "@peersyst/react-components";
import { cx } from "@peersyst/react-utils";
import MyNftsSearch from "module/nft/component/input/MyNftsSearch/MyNftsSearch";
import BackButton from "../../navigation/BackButton/BackButton";
import { BasePageHeaderRoot, BasePageHeaderWrapper } from "./BasePageHeader.styles";
import { BasePageHeaderProps } from "./BasePageHeader.types";

const BasePageHeader = ({
    back,
    title,
    subtitle,
    complement,
    footer,
    backIconSize,
    style,
    className,
}: BasePageHeaderProps): JSX.Element => {
    return (
        <BasePageHeaderRoot className={cx("base-page-header", className)} style={style}>
            <BasePageHeaderWrapper gap="2rem">
                <Row justifyContent="space-between" wrap wrapGap="1.5rem">
                    <Row alignItems="center" gap="2rem">
                        {back && <BackButton size={backIconSize} />}
                        <Col justifyContent="center" gap="0.75rem">
                            <Typography variant="h3" fontWeight="800">
                                {title}
                            </Typography>
                            {subtitle && (
                                <Typography variant="subtitle1" fontWeight="500" light textTransform="uppercase">
                                    {subtitle}
                                </Typography>
                            )}
                        </Col>
                    </Row>
                    {complement}
                </Row>
                {footer}
            </BasePageHeaderWrapper>
        </BasePageHeaderRoot>
    );
};

export default BasePageHeader;

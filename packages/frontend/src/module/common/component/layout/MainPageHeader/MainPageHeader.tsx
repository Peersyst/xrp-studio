import { Col, Row, Typography } from "@peersyst/react-components";
import { cx } from "@peersyst/react-utils";
import BackButton from "../../navigation/BackButton/BackButton";
import { MainPageHeaderRoot, MainPageHeaderWrapper } from "./MainPageHeader.styles";
import { MainPageHeaderProps } from "./MainPageHeader.types";

const MainPageHeader = ({
    back,
    title,
    subtitle,
    complement,
    footer,
    backIconSize,
    style,
    stickyTitle,
    className,
}: MainPageHeaderProps): JSX.Element => {
    return (
        <MainPageHeaderRoot stickyTitle={stickyTitle} className={cx("base-page-header", className)} style={style}>
            <MainPageHeaderWrapper gap="2rem">
                <Row justifyContent="space-between" wrap wrapGap="1.5rem" gap="2.5rem">
                    <Row alignItems="center" gap="2rem">
                        {back && <BackButton size={backIconSize} />}
                        <Col justifyContent="center" gap="0.75rem">
                            {title && (
                                <Typography variant="h3" fontWeight="800">
                                    {title}
                                </Typography>
                            )}
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
            </MainPageHeaderWrapper>
        </MainPageHeaderRoot>
    );
};

export default MainPageHeader;

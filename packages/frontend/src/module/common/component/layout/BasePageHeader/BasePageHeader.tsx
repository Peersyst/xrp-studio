import { Col, Row, Typography } from "@peersyst/react-components";
import { ReactElement } from "react";
import { ArrowButtonProps } from "../../input/ArrowButton/ArrowButton.types";
import BackButton from "../../navigation/BackButton/BackButton";
import { BasePageHeaderRoot, BasePageHeaderWrapper } from "./BasePageHeader.styles";

interface BasePageHeaderProps {
    back?: boolean;
    backIconSize?: ArrowButtonProps["size"];
    title: string;
    subtitle?: string;
    complement?: ReactElement;
    footer?: ReactElement;
}

const BasePageHeader = ({ back, title, subtitle, complement, footer, backIconSize }: BasePageHeaderProps): JSX.Element => {
    return (
        <BasePageHeaderRoot>
            <BasePageHeaderWrapper gap="2.5rem">
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

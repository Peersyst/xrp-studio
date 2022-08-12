import { Col, Row, Typography } from "@peersyst/react-components";
import { SecondaryPageHeaderProps } from "./SecondaryPageHeader.types";

const SecondaryPageHeader = ({ title, children: { complement, bottomComponent } = {} }: SecondaryPageHeaderProps): JSX.Element => {
    return (
        <Col gap="1.5rem">
            <Row css={{ width: "100%" }} justifyContent="space-between" wrap wrapGap="1.25rem">
                {typeof title === "string" ? (
                    <Typography variant="h3" fontWeight="800">
                        {title}
                    </Typography>
                ) : (
                    title
                )}
                {complement}
            </Row>
            {bottomComponent}
        </Col>
    );
};

export default SecondaryPageHeader;

import { Col, Typography } from "@peersyst/react-components";
import { InformationFieldProps } from "./InformationField.types";

const InformationField = ({ title, children }: InformationFieldProps): JSX.Element => {
    return (
        <Col gap="0.75rem">
            <Typography variant="body1" color={"black.40"} fontWeight={700}>
                {title}:
            </Typography>
            {children}
        </Col>
    );
};

export default InformationField;

import { Col, Typography } from "@peersyst/react-components";
import { InformationFieldProps } from "./InformationField.types";

const InformationField = ({ title, children }: InformationFieldProps): JSX.Element => {
    return (
        <Col>
            <Typography variant="body1" fontWeight={700}>
                {title}:
            </Typography>
            {children}
        </Col>
    );
};

export default InformationField;

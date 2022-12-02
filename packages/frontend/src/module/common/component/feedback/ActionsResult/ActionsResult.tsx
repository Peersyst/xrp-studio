import { PublishResultProps } from "module/common/component/feedback/ActionsResult/ActionsResult.types";
import { Col, Divider, Row, Typography } from "@peersyst/react-components";
import { AlertCircleIcon, CheckCircleIcon } from "icons";

const ActionsResult = ({ title, type, children }: PublishResultProps): JSX.Element => {
    return (
        <Col gap="2rem">
            <Col gap="1rem">
                <Row gap={10} alignItems="center">
                    {type === "success" ? <CheckCircleIcon fontSize={18} /> : <AlertCircleIcon fontSize={18} />}
                    <Typography variant="h6" fontWeight={700}>
                        {title}
                    </Typography>
                </Row>
                <Divider />
            </Col>
            <Col gap="1rem">{children}</Col>
        </Col>
    );
};

export default ActionsResult;

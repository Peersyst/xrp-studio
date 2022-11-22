import { Col, Divider, Row, Typography } from "@peersyst/react-components";
import { Fragment } from "react";
import { PublishResultProps } from "module/common/component/feedback/PublishResult/PublishResult.types";
import { AlertCircleIcon, CheckCircleIcon } from "icons";

const PublishResult = ({ title, type, children }: PublishResultProps): JSX.Element => {
    return (
        <Col gap="1rem">
            <Row gap={10}>
                {type === "success" ? <CheckCircleIcon fontSize="1.5rem" /> : <AlertCircleIcon fontSize="1.5rem" />}
                <Typography variant="h6" fontWeight={700}>
                    {title}
                </Typography>
            </Row>
            <Divider />
            <Fragment>{children}</Fragment>
        </Col>
    );
};

export default PublishResult;

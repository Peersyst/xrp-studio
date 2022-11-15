import { ReactElement } from "react";
import { Col, Row, Typography } from "@peersyst/react-components";
import { ModalRoot } from "module/common/component/feedback/Modal/Modal.styles";
import { ModalProps as BaseModalProps } from "@peersyst/react-components";

export interface PublishModalProps extends Omit<BaseModalProps, "children"> {
    title?: string;
    children: { content: ReactElement; action: ReactElement };
}

const PublishModal = ({ title, children: { content, action }, ...rest }: PublishModalProps): JSX.Element => {
    return (
        <ModalRoot size="lg" {...rest}>
            <Col gap="3rem">
                {title && (
                    <Col>
                        <Typography variant="h3" fontWeight={700} className="modal-title">
                            {title}
                        </Typography>
                    </Col>
                )}
                {content}
                {action && (
                    <Row gap={4} justifyContent="center">
                        {action}
                    </Row>
                )}
            </Col>
        </ModalRoot>
    );
};

export default PublishModal;

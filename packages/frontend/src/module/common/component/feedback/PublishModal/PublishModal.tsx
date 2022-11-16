import { ReactElement } from "react";
import { Col, Row } from "@peersyst/react-components";
import { ModalProps as BaseModalProps } from "@peersyst/react-components";
import Modal from "module/common/component/feedback/Modal/Modal";

export interface PublishModalProps extends Omit<BaseModalProps, "children"> {
    title?: string;
    children: { content: ReactElement; action: ReactElement };
}

const PublishModal = ({ children: { content, action }, ...rest }: PublishModalProps): JSX.Element => {
    return (
        <Modal size="lg" {...rest}>
            <Col gap="3rem">
                {content}
                {action && (
                    <Row gap={4} justifyContent="center">
                        {action}
                    </Row>
                )}
            </Col>
        </Modal>
    );
};

export default PublishModal;

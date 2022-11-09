import { ReactElement } from "react";
import Modal from "module/common/component/feedback/Modal/Modal";
import { Col, createModal, Row } from "@peersyst/react-components";
import { ModalProps } from "module/common/component/feedback/Modal/Modal.types";

export interface PublishModalProps {
    children: { cover: ReactElement; information: ReactElement };
    modalProps: ModalProps;
}

export const PublishModal = createModal((modalProps, { children: { cover, information } }): JSX.Element => {
    return (
        <Modal {...modalProps}>
            <Col>
                <Row>{cover}</Row>
                <Row>{information}</Row>
            </Col>
        </Modal>
    );
});

export default PublishModal;

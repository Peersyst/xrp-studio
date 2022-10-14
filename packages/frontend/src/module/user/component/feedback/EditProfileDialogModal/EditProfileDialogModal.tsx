import { Col, createModal, ModalProps } from "@peersyst/react-components";
import { EditProfileDialogModalRoot } from "./EditProfileDialogModal.styles";
import EditProfileDialogModalBody from "./EditProfileDialogModalBody/EditProfileDialogModalBody";
import EditProfileDialogModalHeader from "./EditProfileDialogModalHeader/EditProfileDialogModalHeader";

export interface EditProfileDialogModalProps extends ModalProps {}

const EditProfileDialogModal = createModal(({ ...modalProps }: EditProfileDialogModalProps) => {
    return (
        <EditProfileDialogModalRoot {...modalProps}>
            <Col flex={1} gap="3.5rem" css={{ height: "100%" }}>
                <EditProfileDialogModalHeader />
                <EditProfileDialogModalBody />
            </Col>
        </EditProfileDialogModalRoot>
    );
});

export default EditProfileDialogModal;

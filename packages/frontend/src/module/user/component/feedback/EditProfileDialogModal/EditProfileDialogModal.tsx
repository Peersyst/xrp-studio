import { Col, createModal, ModalProps } from "@peersyst/react-components";
import { EditProfileDialogModalRoot } from "./EditProfileDialogModal.styles";
import EditProfileDialogModalHeader from "./EditProfileDialogModalHeader/EditProfileDialogModalHeader";

export interface EditProfileDialogModalProps extends ModalProps {}

const EditProfileDialogModal = createModal(({ ...modalProps }: EditProfileDialogModalProps) => {
    return (
        <EditProfileDialogModalRoot {...modalProps}>
            <EditProfileDialogModalHeader />
            <Col css={{ padding: "1.5rem" }} gap="1rem">
                <h1 css={{ fontSize: "1.5rem", fontWeight: "bold" }}>Edit Profile</h1>
            </Col>
        </EditProfileDialogModalRoot>
    );
});

export default EditProfileDialogModal;

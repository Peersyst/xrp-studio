import { createModal, ModalProps } from "@peersyst/react-components";
import { EditProfileDialogModalRoot } from "./EditProfileDialogModal.styles";
import EditProfileDialogModalHeader from "./EditProfileDialogModalHeader/EditProfileDialogModalHeader";

export interface EditProfileDialogModalProps extends ModalProps {}

const EditProfileDialogModal = createModal(({ ...modalProps }: EditProfileDialogModalProps) => {
    return (
        <EditProfileDialogModalRoot {...modalProps}>
            <EditProfileDialogModalHeader />
        </EditProfileDialogModalRoot>
    );
});

export default EditProfileDialogModal;

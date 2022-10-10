import { createModal } from "@peersyst/react-components";
import Dialog from "module/common/component/feedback/Dialog/Dialog";

const EditProfileModal = createModal(({ ...modalProps }) => {
    return (
        <Dialog {...modalProps}>
            <div>Modal content</div>
        </Dialog>
    );
});

export default EditProfileModal;

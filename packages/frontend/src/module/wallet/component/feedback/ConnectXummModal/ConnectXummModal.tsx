import { createModal } from "@peersyst/react-components";
import Modal from "module/common/component/feedback/Modal/Modal";
import useTranslate from "module/common/hook/useTranslate";

const ConnectXummModal = createModal((modalProps): JSX.Element => {
    const translate = useTranslate();
    return (
        <Modal title={translate("scanXummQR")} subtitle={translate("scanXummQRExplanation")} {...modalProps}>
            AQUÏ L QR
        </Modal>
    );
});

export default ConnectXummModal;

import { Col, createModal } from "@peersyst/react-components";
import useTranslate from "module/common/hook/useTranslate";
import Button from "../../input/Button/Button";
import Modal from "../Modal/Modal";
import useQrModalQrCode from "./hook/useQrModalQrCode";
import { QrCard, QrImage } from "./QrModal.styles";
import { QrModalProps } from "./QrModal.types";

const QrModal = createModal<QrModalProps>(({ children, qr, loading = false, size = "sm", close, id, ...modalProps }) => {
    const translate = useTranslate();

    const qrIsImage = typeof qr === "string";
    const qrId = `qr-modal-qr-${id}`;

    useQrModalQrCode({ qr, enabled: !qrIsImage, qrId });

    return (
        <Modal size={size} {...modalProps}>
            <Col gap="3rem" alignItems="center">
                <QrCard>{qrIsImage ? <QrImage alt="xumm-login" src={qr} /> : <div id={qrId} />}</QrCard>
                {children}
            </Col>
            <Button loading={loading} onClick={close}>
                {translate("dismiss")}
            </Button>
        </Modal>
    );
});

export default QrModal;

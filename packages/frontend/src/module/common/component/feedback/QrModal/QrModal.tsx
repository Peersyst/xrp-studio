import { Col, createModal, Image } from "@peersyst/react-components";
import useIsMobile from "module/common/hook/useIsMobile";
import useTranslate from "module/common/hook/useTranslate";
import QRCode from "react-qr-code";
import { useTheme } from "styled-components";
import Button from "../../input/Button/Button";
import Modal from "../Modal/Modal";
import { QrCard } from "./QrModal.styles";
import { QrModalProps } from "./QrModal.types";

const QrModal = createModal<QrModalProps>(({ children, qr, loading = false, size = "sm", close, ...modalProps }) => {
    const translate = useTranslate();

    const { palette } = useTheme();

    const isMobile = useIsMobile();
    const qrSize = isMobile ? "100%" : size === "lg" ? "30rem" : "16rem";

    const qrIsImage = typeof qr === "string";

    return (
        <Modal size={size} {...modalProps}>
            <Col gap="3rem" alignItems="center">
                <QrCard>
                    {qrIsImage ? (
                        <Image alt="qr" src={qr} style={{ width: qrSize, height: qrSize }} />
                    ) : (
                        <QRCode
                            fgColor={palette.text}
                            bgColor={palette.background}
                            style={{ width: qrSize, height: qrSize }}
                            value={qr.text}
                        />
                    )}
                </QrCard>
                {children}
            </Col>
            <Button loading={loading} onClick={close}>
                {translate("dismiss")}
            </Button>
        </Modal>
    );
});

export default QrModal;

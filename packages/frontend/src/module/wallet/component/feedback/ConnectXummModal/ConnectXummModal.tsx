import { createModal, Col, Row, Typography, useModal } from "@peersyst/react-components";
import Modal from "module/common/component/feedback/Modal/Modal";
import Button from "module/common/component/input/Button/Button";
import useTranslate from "module/common/hook/useTranslate";
import XummAppLink from "../../navigation/XummAppLink/XummAppLink";
import { QrCard, QrImage } from "./ConnectXummModal.styles";
import { useEffect } from "react";
import useConnectToXumm from "module/wallet/hook/useConnectToXumm/useConnectToXumm";

const ConnectXummModal = createModal((modalProps): JSX.Element => {
    const translate = useTranslate();
    const { hideModal } = useModal();
    const { signIn, xummQrUrl = "", showLoading } = useConnectToXumm({ callback: modalProps.onClose });

    useEffect(() => {
        signIn();
    }, []);

    return (
        <Modal size="md" title={translate("scanXummQR")} subtitle={translate("scanXummQRExplanation")} {...modalProps}>
            <QrCard>
                <Col alignItems="center" gap="3rem" className="qr-card-cont">
                    <QrImage alt="xumm-login" src={xummQrUrl} />
                    <Col gap="1rem" alignItems="center">
                        <Typography variant="body2">{translate("getXummCTA")}</Typography>
                        <Row gap="1.5rem" wrap wrapGap="1rem" justifyContent="center">
                            <XummAppLink.AppStore />
                            <XummAppLink.PlayStore />
                        </Row>
                    </Col>
                </Col>
            </QrCard>
            <Button loading={showLoading} onClick={() => hideModal(ConnectXummModal.id)}>
                {translate("dismiss")}
            </Button>
        </Modal>
    );
});

export default ConnectXummModal;

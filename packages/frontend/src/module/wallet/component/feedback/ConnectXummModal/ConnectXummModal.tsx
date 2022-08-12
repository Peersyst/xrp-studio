import { createModal, Col, Row, Typography, useModal } from "@peersyst/react-components";
import Modal from "module/common/component/feedback/Modal/Modal";
import Button from "module/common/component/input/Button/Button";
import useTranslate from "module/common/hook/useTranslate";
import { QrCard, QrImage } from "./ConnectXummModal.styles";
import StoreLink from "../../navigation/StoreLink/StoreLink";
import useConnectToXumm from "../../hooks/useConnectToXumm/useConnectToXumm";
import { useEffect } from "react";

const ConnectXummModal = createModal((modalProps): JSX.Element => {
    const translate = useTranslate();
    const { hideModal } = useModal();
    const { signIn, xummQrUrl, showLoading } = useConnectToXumm();

    useEffect(() => {
        signIn();
    }, []);

    return (
        <Modal title={translate("scanXummQR")} subtitle={translate("scanXummQRExplanation")} {...modalProps}>
            <QrCard>
                <Col alignItems="center" gap="3rem" className="qr-card-cont">
                    <QrImage alt="xumm-login" src={xummQrUrl} />
                    <Col gap="1rem" alignItems="center">
                        <Typography variant="body2" fontWeight={400}>
                            {translate("getXummCTA")}
                        </Typography>
                        <Row gap="1.5rem" wrap wrapGap="1rem" justifyContent="center">
                            <StoreLink type="appStore" />
                            <StoreLink type="playStore" />
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

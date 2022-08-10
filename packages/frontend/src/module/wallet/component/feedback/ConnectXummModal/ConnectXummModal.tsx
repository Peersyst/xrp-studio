import { createModal, Col, Row, Typography, useModal } from "@peersyst/react-components";
import Modal from "module/common/component/feedback/Modal/Modal";
import Button from "module/common/component/input/Button/Button";
import useTranslate from "module/common/hook/useTranslate";
import { QrCard, QrImage } from "./ConnectXummModal.styles";
import StoreLink from "../../navigation/StoreLink/StoreLink";

const ConnectXummModal = createModal((modalProps): JSX.Element => {
    const translate = useTranslate();
    const { hideModal } = useModal();
    return (
        <Modal title={translate("scanXummQR")} subtitle={translate("scanXummQRExplanation")} {...modalProps}>
            <QrCard>
                <Col alignItems="center" gap="3rem" className="qr-card-cont">
                    <QrImage alt="xumm-login" src={"https://xumm.app/sign/6b801334-77ee-43ec-938e-31a35f4c3cf6_q.png"} />
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
            <Button onClick={() => hideModal(ConnectXummModal.id)}>{translate("dismiss")}</Button>
        </Modal>
    );
});

export default ConnectXummModal;

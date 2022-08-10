import { createModal, Col, Row, Image, SvgIcon, Typography } from "@peersyst/react-components";
import Modal from "module/common/component/feedback/Modal/Modal";
import Button from "module/common/component/input/Button/Button";
import useTranslate from "module/common/hook/useTranslate";
import { QrCard, QrImage } from "./ConnectXummModal.styles";
import { image } from "images";

const ConnectXummModal = createModal((modalProps): JSX.Element => {
    const translate = useTranslate();
    return (
        <Modal title={translate("scanXummQR")} subtitle={translate("scanXummQRExplanation")} {...modalProps}>
            <QrCard>
                <Col alignItems="center" gap="3rem" className="qr-card-cont">
                    <QrImage alt="xumm-login" src={"https://xumm.app/sign/6b801334-77ee-43ec-938e-31a35f4c3cf6_q.png"} />
                    <Row flex={1} alignItems="flex-end" gap="1.5rem" wrap wrapGap="1rem" justifyContent="center">
                        <Button>
                            <Image css={{ height: "90%" }} src={image.iOSAppStore.default} alt="" />
                        </Button>
                        <Button>
                            <Image css={{ height: "90%" }} src={image.googlePlayStore.default} alt="" />
                        </Button>
                    </Row>
                </Col>
            </QrCard>
            <Button>{translate("dismiss")}</Button>
        </Modal>
    );
});

export default ConnectXummModal;

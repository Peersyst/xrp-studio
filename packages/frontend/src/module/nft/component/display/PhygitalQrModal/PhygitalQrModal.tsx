import { createModal, ModalProps } from "@peersyst/react-components";
import { config } from "config";
import QrModal from "module/common/component/feedback/QrModal/QrModal";
import AppLinks from "module/common/component/navigation/AppLinks/AppLinks";
import useTranslate from "module/common/hook/useTranslate";

export interface PhygitalQrModalProps extends Omit<ModalProps, "title"> {
    publicKey: string;
}

const PhygitalQrModal = createModal<PhygitalQrModalProps>(({ publicKey, ...rest }) => {
    const translate = useTranslate();

    return (
        <QrModal
            size="lg"
            qr={{ text: publicKey }}
            title={translate("phygitalNft")}
            subtitle={translate("phygitalNftDescription")}
            {...rest}
        >
            <AppLinks
                label={translate("getXrpStudioAppCTA")}
                appStoreLink={config.xrpStudioApStoreLink}
                googlePlayLink={config.xrpStudioGooglePlayLink}
            />
        </QrModal>
    );
});

export default PhygitalQrModal;

import { createModal } from "@peersyst/react-components";
import useTranslate from "module/common/hook/useTranslate";
import { useEffect } from "react";
import useConnectToXumm from "module/wallet/hook/useConnectToXumm/useConnectToXumm";
import { ConnectXummModalProps } from "module/wallet/component/feedback/ConnectXummModal/ConnectXummModal.types";
import QrModal from "module/common/component/feedback/QrModal/QrModal";
import AppLinks from "module/common/component/navigation/AppLinks/AppLinks";
import { config } from "config";
import OpenXummAppButton from "../../input/OpenXummAppButton/OpenXummAppButton";

const ConnectXummModal = createModal<ConnectXummModalProps>(({ close, onSignIn, ...rest }): JSX.Element => {
    const translate = useTranslate();

    const handleSignIn = () => {
        onSignIn?.();
        close();
    };
    const { signIn, xummQrUrl = "", showLoading, xummAppSignatureLink } = useConnectToXumm({ callback: handleSignIn });

    useEffect(() => {
        signIn();
    }, []);

    return (
        <QrModal
            title={translate("scanXummQR")}
            subtitle={translate("scanXummQRExplanation")}
            qr={xummQrUrl}
            loading={showLoading}
            {...rest}
        >
            <OpenXummAppButton size="lg" fullWidth xummAppSignatureLink={xummAppSignatureLink} />
            <AppLinks label={translate("getXummCTA")} appStoreLink={config.appStoreXummLink} googlePlayLink={config.playStoreXummLink} />
        </QrModal>
    );
});

export default ConnectXummModal;

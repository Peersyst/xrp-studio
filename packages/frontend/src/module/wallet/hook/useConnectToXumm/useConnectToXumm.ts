import { useModal, useToast } from "@peersyst/react-components";
import ConnectXummModal from "module/wallet/component/feedback/ConnectXummModal/ConnectXummModal";
import { walletState } from "module/wallet/state/WalletState";
import { useState } from "react";
import { useSetRecoilState } from "recoil";
import { SignInResponse, useSignIn, VerifySignInResponse } from "xumm-react";
import { UseConnectToXummProps, UseConnectToXummReturnValue } from "./useConnectToXumm.types";
import { TransactionRequestStatus } from "xumm-react/@types/useTransactionRequestStatus";
import useTranslate from "module/common/hook/useTranslate";

const useConnectToXumm = ({ callback }: UseConnectToXummProps): UseConnectToXummReturnValue => {
    const [xummQrUrl, setXummQrUrl] = useState<UseConnectToXummReturnValue["xummQrUrl"]>();
    const [xummAppSignatureLink, setXummAppSignatureLink] = useState<UseConnectToXummReturnValue["xummQrUrl"]>();
    const setWalletState = useSetRecoilState(walletState);
    const { hideModal } = useModal();
    const { showToast } = useToast();
    const translateError = useTranslate("error");

    const onSignIn = ({ xummPayload }: SignInResponse) => {
        setXummQrUrl(xummPayload.refs.qr_png);
        setXummAppSignatureLink(xummPayload.next.always);
    };

    const onSignInVerified = ({ address }: VerifySignInResponse) => {
        setWalletState({
            isLogged: true,
            address,
            active: true,
        });
        hideModal(ConnectXummModal.id);
        callback && callback();
    };

    const onSignatureResolved = (status: TransactionRequestStatus) => {
        if (status === "declined") showToast(translateError("xummSignInRequestDeclined"), { type: "error" });
        else if (status === "cancelled") showToast(translateError("xummSignInRequestCancelled"), { type: "error" });
        else if (status === "expired") showToast(translateError("xummSignInRequestExpired"), { type: "error" });
        hideModal(ConnectXummModal.id);
    };

    const { signIn, verifySignInLoading } = useSignIn({ onSignIn, onSignInVerified, onSignatureResolved });

    return { signIn, xummQrUrl, showLoading: verifySignInLoading, xummAppSignatureLink };
};

export default useConnectToXumm;

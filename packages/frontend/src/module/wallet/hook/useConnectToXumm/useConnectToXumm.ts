import { useModal } from "@peersyst/react-components";
import ConnectXummModal from "module/wallet/component/feedback/ConnectXummModal/ConnectXummModal";
import { walletState } from "module/wallet/state/WalletState";
import { useState } from "react";
import { useSetRecoilState } from "recoil";
import { SignInResponse, useSignIn, VerifySignInResponse } from "xumm-react";
import { UseConnectToXummProps, UseConnectToXummReturnValue } from "./useConnectToXumm.types";

const useConnectToXumm = ({ callback }: UseConnectToXummProps): UseConnectToXummReturnValue => {
    const [xummQrUrl, setXummQrUrl] = useState<UseConnectToXummReturnValue["xummQrUrl"]>();
    const setWalletState = useSetRecoilState(walletState);
    const { hideModal } = useModal();

    const onSignIn = ({ xummPayload }: SignInResponse) => {
        setXummQrUrl(xummPayload.refs.qr_png);
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

    const { signIn, verifySignInLoading } = useSignIn({ onSignIn, onSignInVerified });

    return { signIn, xummQrUrl, showLoading: verifySignInLoading };
};

export default useConnectToXumm;

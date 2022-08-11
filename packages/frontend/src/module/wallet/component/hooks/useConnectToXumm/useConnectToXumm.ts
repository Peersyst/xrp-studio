import { useModal } from "@peersyst/react-components";
import { walletState } from "module/wallet/state/WalletState";
import { useState } from "react";
import { useSetRecoilState } from "recoil";
import { SignInResponse, useSignIn, VerifySignInResponse } from "xumm-react";
import ConnectXummModal from "../../feedback/ConnectXummModal/ConnectXummModal";
import { useConnectToXummReturn } from "./useConnectToXumm.types";

const useConnectToXumm = (): useConnectToXummReturn => {
    const [xummQrUrl, setXummQrUrl] = useState<useConnectToXummReturn["xummQrUrl"]>();
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
    };

    const { signIn, verifySignInLoading } = useSignIn({ onSignIn, onSignInVerified });

    return { signIn, xummQrUrl, showLoading: verifySignInLoading };
};

export default useConnectToXumm;

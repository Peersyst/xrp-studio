import { walletState } from "module/wallet/state/WalletState";
import { useSetRecoilState } from "recoil";
import { useVerifySignIn, UseVerifySignInResult, VerifySignInResponse } from "xumm-react";

export type useVerifyXummResult = UseVerifySignInResult["verifySignIn"];

export function useVerifyXumm(): useVerifyXummResult {
    const setWalletState = useSetRecoilState(walletState);
    const onSignInVerified = ({ address }: VerifySignInResponse) => {
        setWalletState({
            isLogged: true,
            address,
            active: true,
        });
    };
    const { verifySignIn } = useVerifySignIn({ onSignInVerified });

    return verifySignIn;
}

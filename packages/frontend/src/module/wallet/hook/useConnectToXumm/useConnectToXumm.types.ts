import { UseSignInResult } from "xumm-react";

export interface UseConnectToXummReturnValue {
    signIn: UseSignInResult["signIn"];
    xummQrUrl: string | undefined;
    showLoading: boolean;
    xummAppSignatureLink: string | undefined;
}

export interface UseConnectToXummProps {
    callback?: (() => unknown) | undefined;
}

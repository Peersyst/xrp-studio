import { UseSignInResult } from "xumm-react";

export interface UseConnectToXummReturnValue {
    signIn: UseSignInResult["signIn"];
    xummQrUrl: string | undefined;
    showLoading: boolean;
}

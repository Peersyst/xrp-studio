import { UseSignInResult } from "xumm-react";

export interface useConnectToXummReturn {
    signIn: UseSignInResult["signIn"];
    xummQrUrl: string | undefined;
    showLoading: boolean;
}

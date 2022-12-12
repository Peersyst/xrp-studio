import useTranslate from "module/common/hook/useTranslate";
import { handleErrorMessage } from "./handleErrorMessage";
import { useToast } from "@peersyst/react-components";
import { useResetRecoilState } from "recoil";
import { walletState } from "module/wallet/state/WalletState";
import { AuthTokenStorage } from "module/auth/AuthTokenStorage";

export default function (): (error: any) => void {
    const translate = useTranslate("error");
    const { showToast } = useToast();
    const resetWalletState = useResetRecoilState(walletState);

    return (error) => {
        if (error.body.statusCode === 401) {
            resetWalletState();
            AuthTokenStorage.clear();
        }
        const { message, type } = handleErrorMessage(error, translate);
        showToast(message, { type });
    };
}

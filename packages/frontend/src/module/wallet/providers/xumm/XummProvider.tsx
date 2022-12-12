import { XummProvider as BaseXummProvider } from "xumm-react";
import { ReactNode } from "react";
import { useConfig } from "@peersyst/react-components";
import { AuthTokenStorage } from "module/auth/AuthTokenStorage";
import useHandleErrorMessage from "../../../../query/useHandleErrorMessage";
import { FetchError } from "xumm-react/@types/util/useFetch";
import { useResetRecoilState } from "recoil";
import { walletState } from "module/wallet/state/WalletState";

export interface XummProviderProps {
    children?: ReactNode;
}

const XummProvider = ({ children }: XummProviderProps): JSX.Element => {
    const backendUrl = useConfig("backendUrl");
    const handleErrorMessage = useHandleErrorMessage();
    const resetWalletState = useResetRecoilState(walletState);

    const handleError = (e: FetchError) => {
        if (e.body.statusCode !== 401) {
            handleErrorMessage(e);
        } else {
            resetWalletState();
            AuthTokenStorage.clear();
        }
    };

    return (
        <BaseXummProvider
            config={{
                url: backendUrl + "/api/xumm",
                getToken: () => AuthTokenStorage.get(),
                setToken: (token) => AuthTokenStorage.set(token),
                removeToken: () => AuthTokenStorage.clear(),
                onError: handleError,
            }}
        >
            {children}
        </BaseXummProvider>
    );
};

export default XummProvider;

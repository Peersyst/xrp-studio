import { XummProvider as BaseXummProvider } from "xumm-react";
import { ReactNode } from "react";
import { useConfig } from "@peersyst/react-components";
import { AuthTokenStorage } from "module/auth/AuthTokenStorage";
import useHandleErrorMessage from "../../../../query/useHandleErrorMessage";

export interface XummProviderProps {
    children?: ReactNode;
}

const XummProvider = ({ children }: XummProviderProps): JSX.Element => {
    const backendUrl = useConfig("backendUrl");
    const handleError = useHandleErrorMessage();

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

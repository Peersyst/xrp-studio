import { AuthTokenStorage } from "module/auth/AuthTokenStorage";
import { ReactNode } from "react";
import { XummProvider } from "xumm-react";

export interface XummProviderProps {
    children?: ReactNode;
}

export const XummTestProvider = ({ children }: XummProviderProps): JSX.Element => {
    return (
        <XummProvider
            config={{
                url: "/api/xumm",
                getToken: () => AuthTokenStorage.get(),
                setToken: (token) => AuthTokenStorage.set(token),
                removeToken: () => AuthTokenStorage.clear(),
                onError: jest.fn(),
            }}
        >
            {children}
        </XummProvider>
    );
};

export default XummTestProvider;

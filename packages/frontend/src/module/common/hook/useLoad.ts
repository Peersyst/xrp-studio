import { AuthTokenStorage } from "module/auth/AuthTokenStorage";
import { useVerifyXumm } from "module/wallet/hook//useVerifyXumm/useVerifyXumm";
import { useEffect, useState } from "react";
import XrplService from "module/blockchain/service/XrplService/XrplService";

export function useLoad(): boolean {
    const [loading, setLoading] = useState(true);
    const verifySignIn = useVerifyXumm();

    useEffect(() => {
        const startApp = async () => {
            await XrplService.initializeClient();

            // Reconnect when tab becomes visible (Switch between mobile apps)
            const handleDocumentVisibilityChange = async () => {
                if (document.visibilityState === "visible") await XrplService.connectClient();
            };

            document.addEventListener("visibilitychange", handleDocumentVisibilityChange);

            const token = AuthTokenStorage.get();
            if (token) {
                await verifySignIn();
            }
            // OTHER STUFF
            setLoading(false);
        };
        startApp();
        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return loading;
}

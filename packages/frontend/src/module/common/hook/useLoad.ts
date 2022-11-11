import { AuthTokenStorage } from "module/auth/AuthTokenStorage";
import { useVerifyXumm } from "module/wallet/hook//useVerifyXumm/useVerifyXumm";
import { useEffect, useState } from "react";

export function useLoad(): boolean {
    const [loading, setLoading] = useState(true);
    const verifySignIn = useVerifyXumm();
    useEffect(() => {
        const startApp = async () => {
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

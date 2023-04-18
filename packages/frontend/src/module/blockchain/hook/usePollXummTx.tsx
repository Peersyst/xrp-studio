import { polling } from "@peersyst/react-utils";
import { useTransactionRequestStatus } from "xumm-react";

export interface usePollXummTxReturn {
    startPolling: (uuid: string) => Promise<void>;
}

export default function usePollXummTx(): usePollXummTxReturn {
    const { fetchStatus } = useTransactionRequestStatus();
    /**
     * Status type "signed" | "declined" | "cancelled" | "expired" | "pending"
     */
    const handleStatus = (status: string | undefined) => {
        switch (status) {
            case "declined":
            case "cancelled":
            case "expired":
                throw new Error("Transaction declined");
            case "signed":
                return false;
            case "pending":
                return true;
            default:
                return false;
        }
    };

    const startPolling = async (uuid: string) => {
        await polling(() => fetchStatus(uuid), handleStatus);
    };

    return {
        startPolling,
    };
}

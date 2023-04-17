import { polling } from "@peersyst/react-utils";
import { useTransactionRequestStatus } from "xumm-react";

export interface UsePoolXummTxReturn {
    startPooling: (uuid: string) => void;
}

export default function usePoolXummTx(): UsePoolXummTxReturn {
    const { fetchStatus } = useTransactionRequestStatus({ onSignatureResolved: () => console.log("onSignatureResolved") });
    /**
     * Status type "signed" | "declined" | "cancelled" | "expired" | "pending"
     */
    const handleStatus = (status: string | undefined) => {
        console.log("status", status);
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

    const startPooling = async (uuid: string) => {
        await polling(() => fetchStatus(uuid), handleStatus);
    };

    return {
        startPooling,
    };
}

import XrplService from "module/blockchain/service/XrplService/XrplService";
import useWallet from "module/wallet/component/hooks/useWallet";
import { useQuery } from "react-query";

export default function () {
    const xrplService = new XrplService();
    const { address } = useWallet();
    return useQuery(["has-balance", address], async () => {
        try {
            return await xrplService.hasEnoughBalance(address ?? "");
        } catch (e) {
            return false;
        }
    });
}

import { useToast } from "@peersyst/react-components";
import XrplService from "module/blockchain/service/XrplService/XrplService";
import useWallet from "module/wallet/component/hooks/useWallet";
import useTranslate from "module/common/hook/useTranslate";
import { useQuery } from "react-query";

export const useCheckBalance = () => {
    const { showToast } = useToast();
    const xrplService = new XrplService();
    const { address } = useWallet();
    const translate = useTranslate("error");
    return useQuery(["has-balance", address], async () => {
        try {
            const hasBalance = await xrplService.hasEnoughBalance(address ?? "");
            if (!hasBalance) {
                showToast(translate("notEnoughtBalance"), { type: "error" });
            }
            return hasBalance;
        } catch (e) {
            return false;
        }
    });
};

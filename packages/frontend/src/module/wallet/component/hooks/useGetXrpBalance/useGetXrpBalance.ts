import XrplService from "module/blockchain/service/XrplService/XrplService";
import { XrplServiceErrors } from "module/blockchain/service/XrplService/XrplService.types";
import { useQuery, UseQueryResult } from "react-query";
import useWallet from "../useWallet";
import { useToast } from "@peersyst/react-components";
import useTranslate from "module/common/hook/useTranslate";

export const useGetXrpBalance = (): UseQueryResult<number> => {
    const { showToast } = useToast();
    const translate = useTranslate("error");
    const xrplService = new XrplService();
    const { address } = useWallet();
    return useQuery(
        ["xrp-balance", address],
        async () => {
            try {
                return await xrplService.getAvailableBalance(address ?? "");
            } catch (e) {
                if (e instanceof Error) {
                    if (e.message === XrplServiceErrors.ACCOUNT_NOT_FOUND) {
                        showToast(translate("xrplAccountNotActiveError"), { type: "info" });
                    } else {
                        showToast(translate("queryXrpBalance"), { type: "error" });
                    }
                }
                return 0;
            }
        },
        {
            onError: () => {
                showToast(translate("queryXrpBalance"), { type: "error" });
            },
        },
    );
};

import XrplService from "module/blockchain/service/XrplService/XrplService";
import { XrplServiceErrors } from "module/blockchain/service/XrplService/XrplService.types";
import { useQuery, UseQueryResult } from "react-query";
import useWallet from "../useWallet";
import { useToast } from "@peersyst/react-components";
import useTranslate from "module/common/hook/useTranslate";
import { useSetRecoilState } from "recoil";
import { walletState } from "module/wallet/state/WalletState";

export const useGetXrpBalance = (): UseQueryResult<number> => {
    const { showToast } = useToast();
    const translate = useTranslate("error");
    const { address, active } = useWallet();
    const setWalletState = useSetRecoilState(walletState);

    return useQuery(
        ["xrp-balance", address],
        async () => {
            try {
                return await XrplService.getAvailableBalance(address ?? "");
            } catch (e) {
                if (active && e instanceof Error) {
                    setWalletState((state) => ({ ...state, active: false }));
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
            refetchInterval: 300000,
            onError: () => {
                showToast(translate("queryXrpBalance"), { type: "error" });
            },
        },
    );
};

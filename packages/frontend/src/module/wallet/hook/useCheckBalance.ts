import { useGetXrpBalance } from "module/wallet/component/hooks/useGetXrpBalance/useGetXrpBalance";
import config from "config/config";
import XrplService from "module/blockchain/service/XrplService/XrplService";

export default function () {
    const { refetch } = useGetXrpBalance();

    return async (amountInDrops: number = config.feeInDrops) => {
        const { data: balance = 0 } = await refetch();
        return BigInt(XrplService.xrpToDrops(String(balance))) >= amountInDrops;
    };
}

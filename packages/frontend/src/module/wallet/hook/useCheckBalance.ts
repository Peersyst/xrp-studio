import { useGetXrpBalance } from "module/wallet/component/hooks/useGetXrpBalance/useGetXrpBalance";
import config from "config/config";

export default function () {
    const { refetch } = useGetXrpBalance();
    return async (amount: number = config.feeInDrops) => {
        const { data: balance = 0 } = await refetch();
        return balance >= amount;
    };
}

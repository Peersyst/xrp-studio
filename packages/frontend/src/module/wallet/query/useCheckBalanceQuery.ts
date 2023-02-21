import Queries from "../../../query/queries";
import { useQuery, UseQueryResult } from "react-query";
import { useGetXrpBalance } from "../hook/useGetXrpBalance/useGetXrpBalance";
import XrplService from "module/blockchain/service/XrplService/XrplService";

export default function useCheckBalanceQuery(amountInDrops: string | undefined): UseQueryResult<boolean> {
    const { data: balance } = useGetXrpBalance();

    return useQuery(
        [Queries.CHECK_BALANCE, balance, amountInDrops],
        () => BigInt(XrplService.xrpToDrops(String(balance))) >= BigInt(amountInDrops!),
        {
            enabled: !!balance && !!amountInDrops,
        },
    );
}

import { useQuery } from "react-query";
import { QueryResult } from "query-utils";
import { FiatCurrencyType } from "module/wallet/types";

// Refetch the data every 3 minutes
const CONVERSION_PRICE_INTERVAL = 1000 * 60 * 3;

export const useGetXrpTokenPrice = (currency: FiatCurrencyType): QueryResult<number | undefined> =>
    useQuery(
        ["tokenPrice", currency],
        async () => {
            const res: any = await fetch(`https://api.coingecko.com/api/v3/coins/ripple`);
            const data = await res.json();
            return data?.market_data?.current_price[currency];
        },
        {
            refetchInterval: CONVERSION_PRICE_INTERVAL,
        },
    );

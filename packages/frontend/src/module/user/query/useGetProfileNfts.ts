import { PaginatedNftDto } from "module/api/service";
import { InfiniteQueryResult } from "query-utils";
import { useGetUserAddress } from "../hook/useGetUserAddress";
import useGetNfts, { UseGetNftsOptions } from "module/nft/query/useGetNfts";
import useNftsFilters from "module/nft/hook/useNftsFilters";

export const useGetProfileNfts = (account?: UseGetNftsOptions["account"]): InfiniteQueryResult<PaginatedNftDto> => {
    const addressParams = useGetUserAddress();
    const usedAddress = account || addressParams;
    const filters: Omit<UseGetNftsOptions, "account"> = useNftsFilters();

    return useGetNfts(
        { account: usedAddress, ...filters },
        {
            enabled: !!usedAddress,
        },
    );
};

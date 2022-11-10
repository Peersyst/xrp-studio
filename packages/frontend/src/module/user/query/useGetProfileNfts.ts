import { PaginatedNftDto } from "module/api/service";
import { InfiniteQueryResult } from "query-utils";
import { useGetUserAddress } from "../hook/useGetUserAddress";
import useGetNfts, { UseGetNftsOptions } from "module/nft/query/useGetNfts";
import useNftsFilters from "module/nft/hook/useNftsFilters";

export const useGetProfileNfts = ({ account, ...rest }: UseGetNftsOptions = {}): InfiniteQueryResult<PaginatedNftDto> => {
    const addressParams = useGetUserAddress();
    const usedAddress = account || addressParams;
    const filters = useNftsFilters();

    return useGetNfts(
        { account: undefined, ...{ ...filters, ...rest } },
        {
            enabled: !!usedAddress,
        },
    );
};

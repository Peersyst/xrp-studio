import { PaginatedNftDto } from "module/api/service";
import { InfiniteQueryResult } from "query-utils";
import { useGetUserAddress } from "../hook/useGetUserAddress";
import useGetNfts, { UseGetNftsOptions } from "module/nft/query/useGetNfts";
import useGetNftsFilters from "module/nft/hook/useGetNftsFilters";

export const useGetProfileNfts = ({ account, ...rest }: UseGetNftsOptions = {}): InfiniteQueryResult<PaginatedNftDto> => {
    const addressParams = useGetUserAddress();
    const usedAddress = account || addressParams;
    const filters = useGetNftsFilters();

    return useGetNfts(
        { account: undefined, ...{ ...filters, ...rest } },
        {
            enabled: !!usedAddress,
        },
    );
};

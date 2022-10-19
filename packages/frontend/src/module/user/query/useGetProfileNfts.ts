import { PaginatedNftDto } from "module/api/service";
import { InfiniteQueryResult } from "query-utils";
import { useGetUserAddress } from "../hook/useGetUserAddress";
import useGetNfts from "module/nft/query/useGetNfts";

export const useGetProfileNfts = (address?: string): InfiniteQueryResult<PaginatedNftDto> => {
    const addressParams = useGetUserAddress();
    const usedAddress = address || addressParams;
    //TODO: implement profile filters
    return useGetNfts(
        { account: usedAddress },
        {
            enabled: !!usedAddress,
        },
    );
};

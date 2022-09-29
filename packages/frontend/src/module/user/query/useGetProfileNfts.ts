import { NftService, PaginatedNftDto } from "module/api/service";
import { InfiniteQueryResult, useInfiniteQuery } from "query-utils";
import Queries from "../../../query/queries";
import { useGetUserAddress } from "../hook/useGetUserAddress";

export const useGetProfileNfts = (address?: string): InfiniteQueryResult<PaginatedNftDto> => {
    const addressParams = useGetUserAddress();
    const usedAddress = address || addressParams;
    //TODO: implement profile filters
    return useInfiniteQuery(
        [Queries.GET_USER_NFTS, usedAddress],
        ({ pageParam = 1 }) => NftService.nftControllerGetNfts(pageParam, 30, undefined, undefined, "DESC", usedAddress),
        {
            enabled: !!usedAddress,
        },
    );
};

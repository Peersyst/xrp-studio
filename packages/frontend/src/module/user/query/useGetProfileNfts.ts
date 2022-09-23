import { NftService, PaginatedNftDto } from "module/api/service";
import { InfiniteQueryResult, useInfiniteQuery } from "query-utils";
import Queries from "../../../query/queries";
import { useGetUserAddress } from "../hook/useGetUserAddress";

export const useGetProfileNfts = (addressParams?: string): InfiniteQueryResult<PaginatedNftDto> => {
    const address = useGetUserAddress(addressParams);
    //TODO: implement profile filters
    return useInfiniteQuery(
        [Queries.GET_USER_NFTS, address],
        ({ pageParam = 1 }) => NftService.nftControllerGetNfts(pageParam, 30, undefined, undefined, "DESC"),
        {
            enabled: true,
        },
    );
};

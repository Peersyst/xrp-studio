import { NftService, PaginatedNftDto } from "module/api/service";
import { InfiniteQueryResult, useInfiniteQuery } from "query-utils";

export const useGetMyNfts = (): InfiniteQueryResult<PaginatedNftDto> => {
    return useInfiniteQuery(["my-nfts"], ({ pageParam = 1 }) =>
        NftService.nftControllerGetNfts(pageParam, 30, undefined, undefined, "DESC"),
    );
};

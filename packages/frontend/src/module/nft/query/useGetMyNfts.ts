import { NftService, PaginatedNftDto } from "module/api/service";
import useWallet from "module/wallet/component/hooks/useWallet";
import { InfiniteQueryResult, useInfiniteQuery } from "query-utils";

export const useGetMyNfts = (): InfiniteQueryResult<PaginatedNftDto> => {
    const { address } = useWallet();
    return useInfiniteQuery(["my-nfts", address], ({ pageParam = 1 }) =>
        NftService.nftControllerGetNfts(pageParam, 30, undefined, undefined, "DESC", address),
    );
};

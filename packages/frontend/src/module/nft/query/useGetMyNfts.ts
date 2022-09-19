import { NftService, PaginatedNftDto } from "module/api/service";
import useWallet from "module/wallet/component/hooks/useWallet";
import { InfiniteData, InfiniteQueryResult, useInfiniteQuery } from "query-utils";
import Queries from "../../../query/queries";

interface UseGetMyNftsParams {
    onSettled?: ((data: InfiniteData<PaginatedNftDto> | undefined, error: unknown) => void) | undefined;
}

export const useGetMyNfts = ({ onSettled }: UseGetMyNftsParams = {}): InfiniteQueryResult<PaginatedNftDto> => {
    const { address } = useWallet();
    return useInfiniteQuery(
        [Queries.GET_MY_NFTS, address],
        ({ pageParam = 1 }) => NftService.nftControllerGetNfts(pageParam, 30, undefined, undefined, "DESC", address),
        {
            onSettled,
        },
    );
};

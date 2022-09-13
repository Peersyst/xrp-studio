import { NftService, PaginatedNftDto } from "module/api/service";
import useWallet from "module/wallet/component/hooks/useWallet";
import { InfiniteData, InfiniteQueryResult, useInfiniteQuery } from "query-utils";

interface UseGetMyNftsParams {
    onSettled?: ((data: InfiniteData<PaginatedNftDto> | undefined, error: unknown) => void) | undefined;
}

export const useGetMyNfts = ({ onSettled }: UseGetMyNftsParams = {}): InfiniteQueryResult<PaginatedNftDto> => {
    const { address } = useWallet();
    return useInfiniteQuery(
        ["my-nfts", address],
        async ({ pageParam = 1 }) => {
            await new Promise((resolve) => setTimeout(resolve, 1000));
            return NftService.nftControllerGetNfts(pageParam, 30, undefined, undefined, "DESC");
        },
        {
            onSettled,
        },
    );
};

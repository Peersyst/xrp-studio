import { PaginatedNftDto } from "module/api/service";
import { InfiniteQueryResult } from "query-utils";
import { useGetProfileNfts } from "module/user/query/useGetProfileNfts";
import useWallet from "module/wallet/component/hooks/useWallet";

export const useGetMyNfts = (): InfiniteQueryResult<PaginatedNftDto> => {
    const { address: account } = useWallet();
    return useGetProfileNfts({ account });
};

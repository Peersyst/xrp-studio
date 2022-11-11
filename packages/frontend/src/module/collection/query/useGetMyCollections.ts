import { InfiniteQueryResult } from "query-utils";
import useWallet from "module/wallet/hook//useWallet";
import { useGetUserCollections } from "module/user/query/useGetUserCollections";
import { PaginatedCollectionDto } from "module/api/service/models/PaginatedCollectionDto";

export const useGetMyCollections = (): InfiniteQueryResult<PaginatedCollectionDto> => {
    const { address } = useWallet();
    return useGetUserCollections(address);
};

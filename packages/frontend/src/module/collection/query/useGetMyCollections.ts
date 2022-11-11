import { InfiniteQueryResult } from "query-utils";
import useWallet from "module/wallet/hook//useWallet";
import { useGetUserCollections } from "module/user/query/useGetUserCollections";
import { PaginatedCollectionDto } from "module/api/service/models/PaginatedCollectionDto";
import useFilters from "module/common/component/input/Filters/hooks/useFilters/useFilters";

export const useGetMyCollections = (): InfiniteQueryResult<PaginatedCollectionDto> => {
    const { address } = useWallet();
    const filters = useFilters();
    return useGetUserCollections({ ...filters, account: address });
};

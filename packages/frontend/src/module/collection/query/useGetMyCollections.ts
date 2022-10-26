import { CollectionService, PaginatedCollectionDto } from "module/api/service";
import { InfiniteQueryResult } from "query-utils";
import useWallet from "module/wallet/component/hooks/useWallet";
import { useInfiniteQuery } from "react-query";
import Queries from "../../../query/queries";

export const useGetMyCollections = (): InfiniteQueryResult<PaginatedCollectionDto> => {
    const { address } = useWallet();
    return useInfiniteQuery(
        [Queries.COLLECTIONS, address],
        ({ pageParam = 1 }) => CollectionService.collectionControllerGetCollections(pageParam, 30, undefined, address, "DESC"),
        {
            enabled: !!address,
        },
    );
};

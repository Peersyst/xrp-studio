import { CollectionService, PaginatedCollectionDto } from "module/api/service";
import { useInfiniteQuery, UseInfiniteQueryResult } from "query-utils";
import Queries from "../../../query/queries";
import { useGetUserAddress } from "../hook/useGetUserAddress";

export const useGetUserCollections = (addressParams?: string): UseInfiniteQueryResult<PaginatedCollectionDto, unknown> => {
    const address = useGetUserAddress(addressParams);
    //TODO: implement profile filters
    return useInfiniteQuery(
        [Queries.GET_USER_NFTS, address],
        async ({ pageParam = 1 }) => {
            await new Promise((resolve) => setTimeout(resolve, 3000));
            return CollectionService.collectionControllerGetCollections(pageParam, 30, undefined, address, "DESC");
        },
        {
            enabled: !!address,
        },
    );
};

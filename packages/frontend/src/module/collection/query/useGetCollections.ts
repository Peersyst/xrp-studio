import { useInfiniteQuery } from "query-utils";
import Queries from "../../../query/queries";
import { CollectionService, PaginatedCollectionDto } from "module/api/service";
import { UseInfiniteQueryOptions, UseInfiniteQueryResult } from "react-query/types/react/types";

export interface UseGetCollectionsOptions {
    query?: string;
    order?: "ASC" | "DESC";
    account?: string;
    unnameds?: boolean;
}

export default function (
    { query, order = "DESC", account, unnameds }: UseGetCollectionsOptions = {},
    options?: Omit<UseInfiniteQueryOptions<PaginatedCollectionDto, unknown, PaginatedCollectionDto>, "queryKey" | "queryFn">,
): UseInfiniteQueryResult<PaginatedCollectionDto> {
    return useInfiniteQuery(
        [Queries.COLLECTIONS, query, order, account, unnameds],
        ({ pageParam = 1 }) =>
            CollectionService.collectionControllerGetCollections(pageParam, 30, query, account, order, undefined, unnameds),
        options,
    );
}

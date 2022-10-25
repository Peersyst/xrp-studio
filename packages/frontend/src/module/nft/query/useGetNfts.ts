import { useInfiniteQuery } from "query-utils";
import Queries from "../../../query/queries";
import { NftService, PaginatedNftDto } from "module/api/service";
import { UseInfiniteQueryOptions, UseInfiniteQueryResult } from "react-query/types/react/types";

export interface UseGetNftsOptions {
    query?: string;
    collections?: number[];
    order?: "ASC" | "DESC";
    account?: string;
}

export default function (
    { query, collections, order = "DESC", account }: UseGetNftsOptions = {},
    options?: Omit<UseInfiniteQueryOptions<PaginatedNftDto, unknown, PaginatedNftDto>, "queryKey" | "queryFn">,
): UseInfiniteQueryResult<PaginatedNftDto> {
    return useInfiniteQuery(
        [Queries.NFTS, query, collections, order, account],
        ({ pageParam = 1 }) => NftService.nftControllerGetNfts(pageParam, 30, query, collections, order, account),
        options,
    );
}

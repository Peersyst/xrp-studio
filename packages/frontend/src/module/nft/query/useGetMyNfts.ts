import { NftService, PaginatedNftDraftDto } from "module/api/service";
import { UseInfiniteQueryOptions } from "react-query/types/react/types";
import { useInfiniteQuery, UseInfiniteQueryResult } from "react-query";
import Queries from "../../../query/queries";

export interface UseGetNftMyNftsOptions {
    query?: string;
    collections?: Array<number>;
    order?: "ASC" | "DESC";
    status?: "confirmed" | "draft" | "pending" | "failed";
}

export default function (
    { query, collections, order, status }: UseGetNftMyNftsOptions = {},
    options?: Omit<UseInfiniteQueryOptions<PaginatedNftDraftDto, unknown, PaginatedNftDraftDto>, "queryKey" | "queryFn">,
): UseInfiniteQueryResult<PaginatedNftDraftDto> {
    return useInfiniteQuery(
        [Queries.MY_NFTS, query, collections, order, status],
        ({ pageParam = 1 }) => NftService.nftControllerGetMyNfts(pageParam, 100, query, collections, order, status),
        options,
    );
}

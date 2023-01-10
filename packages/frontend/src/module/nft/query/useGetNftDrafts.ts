import { UseInfiniteQueryOptions } from "react-query/types/react/types";
import { NftService, PaginatedNftDraftDto } from "module/api/service";
import { useInfiniteQuery, UseInfiniteQueryResult } from "react-query";
import Queries from "../../../query/queries";

export interface UseGetNftDraftsOptions {
    query?: string;
    collections?: Array<number>;
    order?: "ASC" | "DESC";
}

export default function (
    { query, collections, order }: UseGetNftDraftsOptions = {},
    options?: Omit<UseInfiniteQueryOptions<PaginatedNftDraftDto, unknown, PaginatedNftDraftDto>, "queryKey" | "queryFn">,
): UseInfiniteQueryResult<PaginatedNftDraftDto> {
    return useInfiniteQuery(
        [Queries.NFT_DRAFTS, query, collections, order],
        ({ pageParam = 1 }) => NftService.nftControllerGetMyNfts(pageParam, 100, query, collections, order),
        options,
    );
}

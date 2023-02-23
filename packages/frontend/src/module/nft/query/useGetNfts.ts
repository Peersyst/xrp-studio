import { useInfiniteQuery } from "query-utils";
import Queries from "../../../query/queries";
import { NftService, PaginatedNftDto } from "module/api/service";
import { UseInfiniteQueryOptions, UseInfiniteQueryResult } from "react-query/types/react/types";

export type NftControllerGetNftsParams = Parameters<typeof NftService.nftControllerGetNfts>;

export enum NftFilterNames {
    COLLECTIONS = "collections",
}

export type UseGetNftsOptions = {
    query?: string;
    collections?: Array<number>;
    order?: "ASC" | "DESC";
    account?: string;
    unnameds?: boolean;
};

export default function (
    { query, collections, order = "DESC", account, unnameds }: UseGetNftsOptions = {},
    options?: Omit<UseInfiniteQueryOptions<PaginatedNftDto, unknown, PaginatedNftDto>, "queryKey" | "queryFn">,
): UseInfiniteQueryResult<PaginatedNftDto> {
    return useInfiniteQuery(
        [Queries.NFTS, query, collections, order, account, unnameds],
        ({ pageParam = 1 }) =>
            NftService.nftControllerGetNfts(pageParam, 100, query, collections, account, ["confirmed"], order, undefined, unnameds),
        options,
    );
}

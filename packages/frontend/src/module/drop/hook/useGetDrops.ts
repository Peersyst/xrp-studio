import { UseInfiniteQueryOptions, UseInfiniteQueryResult } from "react-query/types/react/types";
import { PaginatedDropDto } from "module/api/service/models/PaginatedDropDto";
import { useInfiniteQuery } from "query-utils";
import Queries from "../../../query/queries";
import { DropService } from "module/api/service";

export interface UseGetDropsOptions {
    query?: string;
    order?: "ASC" | "DESC";
    account?: string;
}

export default function (
    { query, order = "DESC", account }: UseGetDropsOptions = {},
    options?: Omit<UseInfiniteQueryOptions<PaginatedDropDto, unknown, PaginatedDropDto>, "queryKey" | "queryFn">,
): UseInfiniteQueryResult<PaginatedDropDto> {
    return useInfiniteQuery(
        [Queries.DROPS, query, order, account],
        ({ pageParam = 1 }) => DropService.dropControllerGetDrops(pageParam, 30, query, account, undefined, order),
        options,
    );
}

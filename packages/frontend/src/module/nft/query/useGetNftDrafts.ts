import { UseInfiniteQueryOptions } from "react-query/types/react/types";
import { PaginatedNftDraftDto } from "module/api/service";
import { UseInfiniteQueryResult } from "react-query";
import useGetMyNfts from "module/nft/query/useGetMyNfts";

export interface UseGetNftDraftsOptions {
    query?: string;
    collections?: Array<number>;
    order?: "ASC" | "DESC";
}

export default function (
    queryParams: UseGetNftDraftsOptions = {},
    options?: Omit<UseInfiniteQueryOptions<PaginatedNftDraftDto, unknown, PaginatedNftDraftDto>, "queryKey" | "queryFn">,
): UseInfiniteQueryResult<PaginatedNftDraftDto> {
    // TODO: Fix broken status array in backend to fetch drafts and failed (That's why this hook is not used right now)
    return useGetMyNfts({ ...queryParams, status: "draft" }, options);
}

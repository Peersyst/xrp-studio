import { PaginatedNftDto } from "module/api/service";
import { InfiniteQueryResult } from "query-utils";
import useGetNfts from "./useGetNfts";

export const useGetCollectionNfts = (id: number): InfiniteQueryResult<PaginatedNftDto> => {
    return useGetNfts({ collections: [id] });
};
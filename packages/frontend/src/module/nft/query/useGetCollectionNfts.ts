import { PaginatedNftDto } from "module/api/service";
import { InfiniteQueryResult } from "query-utils";
import useGetNfts from "./useGetNfts";

export const useGetCollectionNfts = (id: number | undefined): InfiniteQueryResult<PaginatedNftDto> => {
    return useGetNfts({ collections: [id!] }, { enabled: id !== undefined });
};

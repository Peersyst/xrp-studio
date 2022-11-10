import { PaginatedNftDraftDto } from "module/api/service";
import { InfiniteQueryResult } from "query-utils";
import useGetNftDrafts from "module/nft/query/useGetNftDrafts";

export const useGetMyNfts = (): InfiniteQueryResult<PaginatedNftDraftDto> => {
    return useGetNftDrafts();
};

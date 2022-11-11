import { PaginatedNftDraftDto } from "module/api/service";
import { InfiniteQueryResult } from "query-utils";
import useGetNftDrafts from "module/nft/query/useGetNftDrafts";
import useNftsFilters from "../hook/useNftsFilters";

export const useGetMyNfts = (): InfiniteQueryResult<PaginatedNftDraftDto> => {
    const filters = useNftsFilters();
    return useGetNftDrafts(filters);
};

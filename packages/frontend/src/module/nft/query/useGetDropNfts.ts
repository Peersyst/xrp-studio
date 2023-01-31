import { NftPreviewDto, NftService } from "module/api/service";
import { QueryResult } from "query-utils";
import { useQuery } from "react-query";
import Queries from "../../../query/queries";

export const useGetDropNfts = (id: number | undefined): QueryResult<NftPreviewDto[]> => {
    return useQuery([Queries.DROP_NFTS, id], () => NftService.nftControllerGetDropNfts(id!), { enabled: id !== undefined });
};

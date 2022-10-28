import { QueryResult } from "query-utils";
import { NftDraftDto, NftService } from "module/api/service";
import { useQuery } from "react-query";
import Queries from "../../../query/queries";

export default function (id?: number): QueryResult<NftDraftDto> {
    return useQuery([Queries.NFT_DRAFT, id], () => NftService.nftControllerGetNftDraft(id!), { enabled: id !== undefined });
}

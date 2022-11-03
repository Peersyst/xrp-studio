import { QueryResult } from "query-utils";
import { NftDto, NftService } from "module/api/service";
import { useQuery } from "react-query";
import Queries from "../../../query/queries";

export default function (id: number | undefined): QueryResult<NftDto> {
    return useQuery([Queries.NFT, id], () => NftService.nftControllerGetNft(id!), { enabled: id !== undefined });
}

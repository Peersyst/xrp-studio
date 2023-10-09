import { QueryResult } from "query-utils";
import { NftService } from "module/api/service";
import { useQuery } from "react-query";
import Queries from "../../../query/queries";

export default function (id: number | undefined): QueryResult<number> {
    return useQuery([Queries.NFT_AUCTION, id], () => NftService.nftControllerGetAuctionNft(id!), { enabled: id !== undefined });
}

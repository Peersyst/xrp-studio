import { QueryResult } from "query-utils";
import { NftService } from "module/api/service";
import { useQuery } from "react-query";
import Queries from "../../../query/queries";
import { config } from "config";

export default function (id: string | undefined): QueryResult<boolean | undefined> {
    return useQuery([Queries.NFT_SELL, id], () => NftService.nftControllerIsNftSell(id!), {
        enabled: id !== undefined,
        refetchInterval: config.auctionRefechInterval,
    });
}

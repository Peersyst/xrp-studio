import { QueryResult } from "query-utils";
import { AuctionDto, NftService } from "module/api/service";
import { useQuery } from "react-query";
import Queries from "../../../query/queries";
import { config } from "config";

export default function (id: string | undefined, date: number): QueryResult<AuctionDto> {
    return useQuery([Queries.NFT_AUCTION, id], () => NftService.nftControllerGetAuctionNft(id!, date), {
        enabled: id !== undefined,
        refetchInterval: config.auctionRefechInterval,
    });
}

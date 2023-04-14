import { NftDto } from "module/api/service";
import { useMutation } from "react-query";
import Queries from "../../../query/queries";

export interface BuyNftRequest {
    nftId: NftDto["id"];
}

export default function (request: BuyNftRequest) {
    const buyNft = async () => {
        await new Promise((resolve) => setTimeout(resolve, 2000));
    };

    return useMutation([Queries.BUY_NFT], buyNft);
}

import { NftDto } from "module/api/service";
import { useMutation } from "react-query";
import Queries from "../../../query/queries";

export interface MakeNftOfferRequest {
    expirationDays: string;
    price: string;
    destination: string;
    nftId: NftDto["id"];
}

export default function (request: MakeNftOfferRequest) {
    const makeNftOffer = async () => {
        await new Promise((resolve) => setTimeout(resolve, 2000));
    };

    return useMutation([Queries.MAKE_NFT_OFFER], makeNftOffer);
}

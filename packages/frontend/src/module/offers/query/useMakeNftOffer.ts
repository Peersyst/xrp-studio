import { CreateOfferRequest, OfferService } from "module/api/service";
import { useMutation } from "react-query";
import Queries from "../../../query/queries";

export default function (request: CreateOfferRequest) {
    return useMutation([Queries.MAKE_NFT_OFFER], () => OfferService.offerControllerCreate(request));
}

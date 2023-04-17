import { AcceptOfferRequest, OfferService } from "module/api/service";
import { useMutation } from "react-query";
import Queries from "../../../query/queries";

export default function () {
    return useMutation([Queries.BUY_NFT], (request: AcceptOfferRequest) => OfferService.offerControllerAccept(request));
}

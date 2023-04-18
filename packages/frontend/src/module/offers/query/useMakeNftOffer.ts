import { CreateOfferRequest, OfferService } from "module/api/service";
import { useMutation, UseMutationResult } from "react-query";
import Queries from "../../../query/queries";

export default function (request: CreateOfferRequest): UseMutationResult<string, unknown, void, unknown> {
    return useMutation([Queries.MAKE_NFT_OFFER], () => OfferService.offerControllerCreate(request));
}

import { useMutation, UseMutationResult } from "react-query";
import { DropService, RequestBuyNftDto } from "module/api/service";

export default function (): UseMutationResult<RequestBuyNftDto, unknown, number, unknown> {
    return useMutation(DropService.dropControllerBuy);
}

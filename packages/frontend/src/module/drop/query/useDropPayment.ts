import { useMutation, UseMutationResult } from "react-query";
import { DropPaymentDto, DropPaymentRequest, DropService } from "module/api/service";

export default function (): UseMutationResult<DropPaymentDto, unknown, DropPaymentRequest> {
    return useMutation(DropService.dropControllerPayment);
}

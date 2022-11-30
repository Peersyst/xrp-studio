import { useMutation, UseMutationResult } from "react-query";
import { DropService } from "module/api/service";

export default function (): UseMutationResult<any, unknown, number, unknown> {
    return useMutation(DropService.dropControllerBuy);
}

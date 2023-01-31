import { useMutation, UseMutationOptions, UseMutationResult } from "react-query";
import { DropService } from "module/api/service";

export default function (options?: UseMutationOptions): UseMutationResult<any, unknown, void> {
    return useMutation(DropService.dropControllerAuthorize, options);
}

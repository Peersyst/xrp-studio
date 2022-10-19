import { UpdateUserRequest, UserService } from "module/api/service";
import { useMutation, UseMutationResult } from "react-query";

export const useUpdateUser = (): UseMutationResult<void, unknown, UpdateUserRequest, unknown> => {
    return useMutation(UserService.userControllerUpdateUser);
};

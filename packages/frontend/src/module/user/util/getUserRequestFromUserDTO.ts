import { UpdateUserRequest } from "module/api/service";
import { UserDto } from "module/api/service";

/**
 * Change all the null values from the UserDto to undefined
 * @param user as UserDto
 * @returns req as UpdateUserRequest
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getUserRequestFromUserDTO = ({ address, ...user }: UserDto): UpdateUserRequest => {
    const req: UpdateUserRequest = { ...user };
    for (const key in req) {
        if (!req[key as keyof UpdateUserRequest]) {
            req[key as keyof UpdateUserRequest] = undefined;
        }
    }
    return req;
};

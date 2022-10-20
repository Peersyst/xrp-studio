import { UpdateUserRequest } from "module/api/service";
import { UserDto } from "module/api/service";
import createUpdateRequest from "module/common/util/createUpdateRequest";

/**
 * Change all the null values from the UserDto to undefined
 * @param user as UserDto
 * @returns req as UpdateUserRequest
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const createUserRequestFromUserDTO = ({ address, ...rawReq }: UserDto): UpdateUserRequest => {
    return createUpdateRequest({ ...rawReq });
};

export default createUserRequestFromUserDTO;

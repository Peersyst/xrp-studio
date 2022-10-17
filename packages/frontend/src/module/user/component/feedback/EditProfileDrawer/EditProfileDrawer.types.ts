import { UpdateUserRequest } from "module/api/service";

export type UpdateUserFields = keyof UpdateUserRequest;

export type HandleSumbitParams = Required<UpdateUserRequest>;

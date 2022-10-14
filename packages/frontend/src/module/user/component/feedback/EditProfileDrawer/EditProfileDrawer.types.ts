import { UpdateUserRequest } from "module/api/service";

export type UpdateUserFieldsRequest = Omit<UpdateUserRequest, "image" | "header">;

export type UpdateUserFields = keyof UpdateUserFieldsRequest;

export type HandleSumbitParams = Required<UpdateUserFieldsRequest>;

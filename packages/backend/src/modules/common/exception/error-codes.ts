import { HttpStatus } from "@nestjs/common";
import { XummErrorBody, XummErrorCode } from "xumm-module";

enum AppErrorCode {}

export const ErrorCode = { ...AppErrorCode, ...XummErrorCode };
export type ErrorCodeType = AppErrorCode;

export const ErrorBody: { [code in ErrorCodeType]: { statusCode: HttpStatus; message: string } } = {
    ...XummErrorBody,
};

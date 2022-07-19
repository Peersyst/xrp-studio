import { HttpStatus } from "@nestjs/common";
import { XummErrorBody, XummErrorCode } from "../../xumm/xumm-shared-module";

// Define app error codes
enum AppErrorCode {
    COLLECTION_NOT_FOUND = "COLLECTION_NOT_FOUND",
}

export const ErrorCode = { ...AppErrorCode, ...XummErrorCode };
export type ErrorCodeType = AppErrorCode;

export const ErrorBody: { [code in ErrorCodeType]: { statusCode: HttpStatus; message: string } } = {
    ...XummErrorBody,
    [ErrorCode.COLLECTION_NOT_FOUND]: {
        statusCode: HttpStatus.NOT_FOUND,
        message: ErrorCode.COLLECTION_NOT_FOUND,
    },
};

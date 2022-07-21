import { HttpStatus } from "@nestjs/common";
import { XummErrorBody, XummErrorCode } from "../../xumm/xumm-shared-module";
import { StorageErrorBody, StorageErrorCode } from "@peersyst/storage-module/src/exception/error-codes";

// Define app error codes
enum AppErrorCode {
    COLLECTION_NOT_FOUND = "COLLECTION_NOT_FOUND",
    INVALID_IMAGE = "INVALID_IMAGE",
}

export const ErrorCode = { ...AppErrorCode, ...XummErrorCode, ...StorageErrorCode };
export type ErrorCodeType = AppErrorCode | StorageErrorCode;

export const ErrorBody: { [code in ErrorCodeType]: { statusCode: HttpStatus; message: string } } = {
    ...XummErrorBody,
    ...StorageErrorBody,
    [ErrorCode.COLLECTION_NOT_FOUND]: {
        statusCode: HttpStatus.NOT_FOUND,
        message: ErrorCode.COLLECTION_NOT_FOUND,
    },
    [ErrorCode.INVALID_IMAGE]: {
        statusCode: HttpStatus.BAD_REQUEST,
        message: ErrorCode.INVALID_IMAGE,
    },
};

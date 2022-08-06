import { HttpStatus } from "@nestjs/common";
import { XummErrorBody, XummErrorCode } from "@peersyst/xumm-module";
import { StorageErrorBody, StorageErrorCode } from "@peersyst/storage-module/src/exception/error-codes";

// Define app error codes
enum AppErrorCode {
    COLLECTION_NOT_FOUND = "COLLECTION_NOT_FOUND",
    NFT_NOT_FOUND = "NFT_NOT_FOUND",
    NFT_DRAFT_NOT_FOUND = "NFT_DRAFT_NOT_FOUND",
    INVALID_IMAGE = "INVALID_IMAGE",
    NFT_DRAFT_NOT_OWNED = "NFT_DRAFT_NOT_OWNED",
    NFT_DRAFT_ALREADY_PUBLISHED = "NFT_DRAFT_ALREADY_PUBLISHED",
    BAD_DRAFT_STATUS_REQUEST = "BAD_DRAFT_STATUS_REQUEST",
    USER_NOT_FOUND = "USER_NOT_FOUND",
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
    [ErrorCode.NFT_NOT_FOUND]: {
        statusCode: HttpStatus.NOT_FOUND,
        message: ErrorCode.NFT_NOT_FOUND,
    },
    [ErrorCode.NFT_DRAFT_NOT_FOUND]: {
        statusCode: HttpStatus.NOT_FOUND,
        message: ErrorCode.NFT_DRAFT_NOT_FOUND,
    },
    [ErrorCode.INVALID_IMAGE]: {
        statusCode: HttpStatus.BAD_REQUEST,
        message: ErrorCode.INVALID_IMAGE,
    },
    [ErrorCode.NFT_DRAFT_NOT_OWNED]: {
        statusCode: HttpStatus.FORBIDDEN,
        message: ErrorCode.NFT_DRAFT_NOT_OWNED,
    },
    [ErrorCode.NFT_DRAFT_ALREADY_PUBLISHED]: {
        statusCode: HttpStatus.CONFLICT,
        message: ErrorCode.NFT_DRAFT_ALREADY_PUBLISHED,
    },
    [ErrorCode.BAD_DRAFT_STATUS_REQUEST]: {
        statusCode: HttpStatus.BAD_REQUEST,
        message: ErrorCode.BAD_DRAFT_STATUS_REQUEST,
    },
    [ErrorCode.USER_NOT_FOUND]: {
        statusCode: HttpStatus.NOT_FOUND,
        message: ErrorCode.USER_NOT_FOUND,
    },
};

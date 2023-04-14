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
    COLLECTION_TAXON_ALREADY_EXISTS = "COLLECTION_TAXON_ALREADY_EXISTS",
    NO_MORE_TAXONS_AVAILABLE = "NO_MORE_TAXONS_AVAILABLE",
    COLLECTION_NOT_OWNED = "COLLECTION_NOT_OWNED",
    NFT_TRANSFERABLE_NOT_SET = "NFT_TRANSFERABLE_NOT_SET",
    METADATA_URI_NOT_SUPPORTED = "METADATA_URI_NOT_SUPPORTED",
    METADATA_NOT_FOUND = "METADATA_NOT_FOUND",
    COLLECTION_ALREADY_LAUNCHED = "COLLECTION_ALREADY_LAUNCHED",
    NFT_ALREADY_LAUNCHED = "NFT_ALREADY_LAUNCHED",
    DROP_SOLD_OUT = "DROP_SOLD_OUT",
    USER_IS_NOT_VERIFIED = "USER_IS_NOT_VERIFIED",
    DROP_NOT_FOUND = "DROP_NOT_FOUND",
    DROP_PAYMENT_NOT_FOUND = "DROP_PAYMENT_NOT_FOUND",
    INVALID_DROP_PAYMENT = "INVALID_DROP_PAYMENT",
    OFFER_NOT_FOUND = "OFFER_NOT_FOUND",
    INVALID_OFFER_DESTINATION = "INVALID_OFFER_DESTINATION",
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
    [ErrorCode.COLLECTION_TAXON_ALREADY_EXISTS]: {
        statusCode: HttpStatus.CONFLICT,
        message: ErrorCode.COLLECTION_TAXON_ALREADY_EXISTS,
    },
    [ErrorCode.NO_MORE_TAXONS_AVAILABLE]: {
        statusCode: HttpStatus.CONFLICT,
        message: ErrorCode.NO_MORE_TAXONS_AVAILABLE,
    },
    [ErrorCode.COLLECTION_NOT_OWNED]: {
        statusCode: HttpStatus.FORBIDDEN,
        message: ErrorCode.COLLECTION_NOT_OWNED,
    },
    [ErrorCode.NFT_TRANSFERABLE_NOT_SET]: {
        statusCode: HttpStatus.BAD_REQUEST,
        message: ErrorCode.NFT_TRANSFERABLE_NOT_SET,
    },
    [ErrorCode.METADATA_URI_NOT_SUPPORTED]: {
        statusCode: HttpStatus.NOT_IMPLEMENTED,
        message: ErrorCode.METADATA_URI_NOT_SUPPORTED,
    },
    [ErrorCode.METADATA_NOT_FOUND]: {
        statusCode: HttpStatus.NOT_FOUND,
        message: ErrorCode.METADATA_NOT_FOUND,
    },
    [ErrorCode.COLLECTION_ALREADY_LAUNCHED]: {
        statusCode: HttpStatus.PRECONDITION_FAILED,
        message: ErrorCode.COLLECTION_ALREADY_LAUNCHED,
    },
    [ErrorCode.NFT_ALREADY_LAUNCHED]: {
        statusCode: HttpStatus.PRECONDITION_FAILED,
        message: ErrorCode.NFT_ALREADY_LAUNCHED,
    },
    [ErrorCode.DROP_SOLD_OUT]: {
        statusCode: HttpStatus.NOT_FOUND,
        message: ErrorCode.DROP_SOLD_OUT,
    },
    [ErrorCode.USER_IS_NOT_VERIFIED]: {
        statusCode: HttpStatus.UNAUTHORIZED,
        message: ErrorCode.USER_IS_NOT_VERIFIED,
    },
    [ErrorCode.DROP_NOT_FOUND]: {
        statusCode: HttpStatus.NOT_FOUND,
        message: ErrorCode.DROP_NOT_FOUND,
    },
    [ErrorCode.DROP_PAYMENT_NOT_FOUND]: {
        statusCode: HttpStatus.NOT_FOUND,
        message: ErrorCode.DROP_PAYMENT_NOT_FOUND,
    },
    [ErrorCode.INVALID_DROP_PAYMENT]: {
        statusCode: HttpStatus.CONFLICT,
        message: ErrorCode.INVALID_DROP_PAYMENT,
    },
    [ErrorCode.OFFER_NOT_FOUND]: {
        statusCode: HttpStatus.NOT_FOUND,
        message: ErrorCode.OFFER_NOT_FOUND,
    },
    [ErrorCode.INVALID_OFFER_DESTINATION]: {
        statusCode: HttpStatus.CONFLICT,
        message: ErrorCode.INVALID_OFFER_DESTINATION,
    },
};

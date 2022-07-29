import { HttpStatus } from "@nestjs/common";

export enum XummErrorCode {
    USER_NOT_SIGNED_IN = "USER_NOT_SIGNED_IN",
    TOKEN_EXPIRED = "TOKEN_EXPIRED",
    PAYLOAD_NOT_FOUND = "PAYLOAD_NOT_FOUND",
    SIGN_IN_NOT_VERIFIED = "SIGN_IN_NOT_VERIFIED",
    INVALID_CREDENTIALS = "INVALID_CREDENTIALS",
}

export const XummErrorBody: { [code in XummErrorCode]: { statusCode: HttpStatus; message: string } } = {
    [XummErrorCode.USER_NOT_SIGNED_IN]: {
        statusCode: HttpStatus.PRECONDITION_FAILED,
        message: XummErrorCode.USER_NOT_SIGNED_IN,
    },
    [XummErrorCode.TOKEN_EXPIRED]: {
        statusCode: HttpStatus.PRECONDITION_FAILED,
        message: XummErrorCode.USER_NOT_SIGNED_IN,
    },
    [XummErrorCode.PAYLOAD_NOT_FOUND]: {
        statusCode: HttpStatus.NOT_FOUND,
        message: XummErrorCode.PAYLOAD_NOT_FOUND,
    },
    [XummErrorCode.SIGN_IN_NOT_VERIFIED]: {
        statusCode: HttpStatus.UNAUTHORIZED,
        message: "XUMM_LOGIN_NOT_VERIFIED",
    },
    [XummErrorCode.INVALID_CREDENTIALS]: {
        statusCode: HttpStatus.UNAUTHORIZED,
        message: "INVALID_CREDENTIALS",
    },
};

import { HttpStatus } from "@nestjs/common";
import { AuthErrorCode, AuthErrorBody } from "@peersyst/auth-module/src/exception/error-codes";

// Define app error codes
enum AppErrorCode {}

export const ErrorCode = { ...AppErrorCode, ...AuthErrorCode };
export type ErrorCodeType = AppErrorCode | AuthErrorCode;

export const ErrorBody: { [code in ErrorCodeType]: { statusCode: HttpStatus; message: string } } = {
    // Define app error code bodies
    ...AuthErrorBody,
};

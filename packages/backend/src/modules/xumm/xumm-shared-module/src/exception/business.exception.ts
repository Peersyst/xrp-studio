import { HttpException } from "@nestjs/common";
import { XummErrorBody, XummErrorCode } from "./error-codes";

export class XummBusinessException extends HttpException {
    constructor(code: XummErrorCode) {
        super(XummErrorBody[code], XummErrorBody[code].statusCode);
    }
}

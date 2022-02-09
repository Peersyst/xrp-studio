import { ArgumentsHost, Catch, ExceptionFilter } from "@nestjs/common";
import { ApiProperty } from "@nestjs/swagger";
import { Response } from "express";
import { error } from "express-openapi-validator";
import { HttpError } from "express-openapi-validator/dist/framework/types";

@Catch(...Object.values(error))
export class ErrorFilter implements ExceptionFilter {
    catch(error: HttpError, host: ArgumentsHost): void {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        response.status(error.status).header(error.headers).json({
            statusCode: error.status,
            message: error.message,
        });
    }
}

export class ApiError {
    @ApiProperty({ required: true, type: Number })
    statusCode: number;
    @ApiProperty({ required: true, type: String })
    message: string;
}

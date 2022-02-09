import { ApiExtraModels } from "@nestjs/swagger";
import { applyDecorators } from "@nestjs/common";
import { ApiError } from "./error.filter";

export function ApiErrorDecorators(): ClassDecorator {
    return applyDecorators(ApiExtraModels(ApiError));
}

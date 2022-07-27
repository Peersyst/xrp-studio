import { applyDecorators } from "@nestjs/common";
import { ApiQuery } from "@nestjs/swagger";

export function ApiGetNftDraftStatusDecorator(): MethodDecorator {
    return applyDecorators(
        ApiQuery({
            name: "id",
            type: "integer",
            required: false,
        }),
        ApiQuery({
            name: "ids",
            type: "integer",
            isArray: true,
            required: false,
        }),
    );
}

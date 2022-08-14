import { applyDecorators } from "@nestjs/common";
import { ApiQuery } from "@nestjs/swagger";
import { Order } from "../../common/types";

export function ApiBaseGetNftsDecorator(): MethodDecorator {
    return applyDecorators(
        ApiQuery({
            name: "page",
            type: "integer",
            required: false,
        }),
        ApiQuery({
            name: "pageSize",
            type: "integer",
            required: false,
        }),
        ApiQuery({
            name: "query",
            required: false,
        }),
        ApiQuery({
            name: "collection",
            type: "integer",
            required: false,
        }),
        ApiQuery({
            name: "order",
            type: "enum",
            enum: Order,
            required: false,
        }),
    );
}

import { ApiProperty } from "@nestjs/swagger";
import { CollectionExists } from "../../collection/validator/CollectionExists";
import { IsOptional } from "class-validator";
import { Order } from "../../common/types";

export class BaseGetNftsRequest {
    @ApiProperty({
        name: "page",
        type: "integer",
        required: false,
    })
    page?: number;

    @ApiProperty({
        name: "pageSize",
        type: "integer",
        required: false,
    })
    pageSize?: number;

    @ApiProperty({
        name: "query",
        type: "string",
        required: false,
    })
    query?: string;

    @ApiProperty({
        name: "collection",
        type: "integer",
        required: false,
    })
    @IsOptional()
    @CollectionExists()
    collection?: number;

    @ApiProperty({
        name: "order",
        type: "string",
        enum: Order,
        required: false,
    })
    order?: Order;
}

import { ApiProperty } from "@nestjs/swagger";
import { IsOptional } from "class-validator";
import { IsXrplAddress } from "../../common/validator/IsXrplAddress";
import { Order } from "../../common/types";
import { FilterType, NullsPosition, OrderType, QBFilter } from "../../common/util/query-builder.helper";

export class GetCollectionsRequest {
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
        name: "account",
        type: "string",
        required: false,
    })
    @IsOptional()
    @IsXrplAddress()
    account?: string;

    @ApiProperty({
        name: "order",
        type: "string",
        enum: Order,
        required: false,
    })
    order?: Order;

    @ApiProperty({
        name: "orderField",
        type: "string",
        enum: ["priority", "name"],
        required: false,
    })
    orderField?: "priority" | "name";

    static toFilterClause(req: GetCollectionsRequest): QBFilter<string> {
        const filter: QBFilter<string> = {
            qbWheres: [],
            relations: [],
            qbOrders: [],
        };

        if (req.account) {
            filter.qbWheres.push({ field: "account", operator: FilterType.EQUAL, value: req.account });
        }
        if (req.query) {
            filter.qbWheres.push({ field: "collection.name", operator: FilterType.LIKE, value: req.query });
        }

        if (req.order === "ASC") {
            filter.qbOrders.push({
                field: "collection." + (req.orderField || "updated_at"),
                type: OrderType.ASC,
                nullsPosition: NullsPosition.NULLS_LAST,
            });
        } else {
            filter.qbOrders.push({
                field: "collection." + (req.orderField || "updated_at"),
                type: OrderType.DESC,
                nullsPosition: NullsPosition.NULLS_LAST,
            });
        }

        return filter;
    }
}

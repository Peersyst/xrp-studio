import { ApiProperty } from "@nestjs/swagger";
import { Order } from "../../common/types";
import { FilterType, NullsPosition, OrderType, QBFilter } from "../../common/util/query-builder.helper";

export class GetUsersRequest {
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
        name: "order",
        type: "string",
        enum: Order,
        required: false,
    })
    order?: Order;

    @ApiProperty({
        name: "orderField",
        type: "string",
        required: false,
        enum: ["priority", "name"],
    })
    orderField?: "priority" | "name";

    static toFilterClause(req: GetUsersRequest): QBFilter<string> {
        const filter: QBFilter<string> = {
            qbWheres: [],
            relations: [],
            qbOrders: [],
        };

        if (req.query) {
            filter.qbWheres.push({ field: "user.name", operator: FilterType.LIKE, value: req.query });
        }

        if (req.order === "ASC") {
            filter.qbOrders.push({
                field: "user." + req.orderField || "updated_at",
                type: OrderType.ASC,
                nullsPosition: NullsPosition.NULLS_LAST,
            });
        } else {
            filter.qbOrders.push({
                field: "user." + req.orderField || "updated_at",
                type: OrderType.DESC,
                nullsPosition: NullsPosition.NULLS_LAST,
            });
        }

        return filter;
    }
}

import { ApiProperty } from "@nestjs/swagger";
import { IsOptional } from "class-validator";
import { IsXrplAddress } from "../../common/validator/IsXrplAddress";
import { Order } from "../../common/types";
import { FilterType, QBFilter } from "../../common/util/query-builder.helper";

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

    static toFilterClause(req: GetCollectionsRequest): QBFilter {
        const filter: QBFilter = {
            qbWheres: [],
            relations: [],
        };

        if (req.account) {
            filter.qbWheres.push({ field: "account", operator: FilterType.EQUAL, value: req.account });
        }
        if (req.query) {
            filter.qbWheres.push({ field: "name", operator: FilterType.LIKE, value: req.query });
        }

        return filter;
    }
}

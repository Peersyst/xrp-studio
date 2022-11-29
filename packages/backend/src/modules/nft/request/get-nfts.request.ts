import { ApiProperty } from "@nestjs/swagger";
import { CollectionsExists } from "../../collection/validator/CollectionsExists";
import { IsOptional } from "class-validator";
import { Order } from "../../common/types";
import { FilterType, QBFilter } from "../../common/util/query-builder.helper";
import { IsXrplAddress } from "../../common/validator/IsXrplAddress";
import { NftStatus } from "../../../database/entities/Nft";

export class GetNftsRequest {
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
        name: "collections",
        type: "integer",
        isArray: true,
        required: false,
    })
    @IsOptional()
    @CollectionsExists()
    collections?: number[];

    @ApiProperty({
        name: "account",
        type: "string",
        required: false,
    })
    @IsOptional()
    @IsXrplAddress()
    account?: string;

    @ApiProperty({
        name: "status",
        type: "enum",
        enum: NftStatus,
        required: false,
        isArray: true,
    })
    status?: NftStatus | NftStatus[];

    @ApiProperty({
        name: "order",
        type: "string",
        enum: Order,
        required: false,
    })
    order?: Order;

    static toFilterClause(req: GetNftsRequest, { requesterAccount }: { requesterAccount?: string }): QBFilter {
        const filter: QBFilter = {
            qbWheres: [],
            relations: ["metadata", "metadata.attributes"],
        };

        if (req.collections) {
            filter.relations.push("collection");
            filter.qbWheres.push({ field: "collection.id", operator: FilterType.IN, value: req.collections });
        }
        if (req.account || requesterAccount) {
            filter.relations.push("user");
            filter.qbWheres.push({ field: "user.address", operator: FilterType.EQUAL, value: requesterAccount || req.account });
        }
        if (req.query) {
            filter.qbWheres.push({ field: "metadata.name", operator: FilterType.LIKE, value: req.query });
        }
        if (!requesterAccount) {
            filter.qbWheres.push({
                field: "nft.status",
                operator: FilterType.EQUAL,
                value: NftStatus.CONFIRMED,
            });
        } else if (req.status) {
            filter.qbWheres.push({
                field: "nft.status",
                operator: typeof req.status === "object" ? FilterType.IN : FilterType.EQUAL,
                value: req.status,
            });
        }

        return filter;
    }
}

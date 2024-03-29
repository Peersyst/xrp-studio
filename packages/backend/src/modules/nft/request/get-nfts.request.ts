import { ApiProperty } from "@nestjs/swagger";
import { CollectionsExists } from "../../collection/validator/CollectionsExists";
import { IsOptional } from "class-validator";
import { Order } from "../../common/types";
import { FilterType, NullsPosition, OrderType, QBFilter } from "../../common/util/query-builder.helper";
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
        name: "isVerifiedArtist",
        type: "boolean",
        required: false,
    })
    @IsOptional()
    isVerifiedArtist?: boolean;

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

    @ApiProperty({
        name: "orderField",
        type: "string",
        enum: ["priority", "name"],
        required: false,
    })
    orderField?: "priority" | "name";

    static toFilterClause(req: GetNftsRequest, { requesterAccount }: { requesterAccount?: string }): QBFilter<string> {
        const filter: QBFilter<string> = {
            qbWheres: [],
            relations: ["metadata", "nftInDrop"],
            qbOrders: [],
        };

        if (req.collections) {
            filter.relations.push("collection");
            filter.qbWheres.push({ field: "collection.id", operator: FilterType.IN, value: req.collections });
        }
        if (req.account) {
            filter.qbWheres.push({ field: "owner_account", operator: FilterType.EQUAL, value: req.account });
        }
        if (req.isVerifiedArtist) {
            filter.relations.push("user");
            filter.qbWheres.push({ field: "user.verifiedArtist", operator: FilterType.EQUAL, value: true });
        }
        if (req.query) {
            filter.qbWheres.push({ field: "metadata.name", operator: FilterType.LIKE, value: req.query });
        }
        if (req.status) {
            filter.qbWheres.push({
                field: "nft.status",
                operator: typeof req.status === "object" ? FilterType.IN : FilterType.EQUAL,
                value: req.status,
            });
        }
        if (!requesterAccount) {
            filter.qbWheres.push({
                field: "nft.status",
                operator: FilterType.EQUAL,
                value: NftStatus.CONFIRMED,
            });
        } else {
            if (!filter.relations.includes("user")) filter.relations.push("user");
            filter.qbWheres.push({
                operator: FilterType.OR,
                value: [
                    {
                        field: "user.address",
                        operator: FilterType.EQUAL,
                        value: requesterAccount,
                    },
                    {
                        field: "nft.status",
                        operator: FilterType.EQUAL,
                        value: NftStatus.CONFIRMED,
                    },
                ],
            });
        }

        if (req.order === "ASC") {
            filter.qbOrders.push({
                field: "nft." + (req.orderField || "updated_at"),
                type: OrderType.ASC,
                nullsPosition: NullsPosition.NULLS_LAST,
            });
        } else {
            filter.qbOrders.push({
                field: "nft." + (req.orderField || "updated_at"),
                type: OrderType.DESC,
                nullsPosition: NullsPosition.NULLS_LAST,
            });
        }

        return filter;
    }
}

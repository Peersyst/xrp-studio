import { ApiProperty } from "@nestjs/swagger";
import { FilterType, QBWhere } from "../../common/util/query-builder.helper";

export interface DropFilterI {
    qbWheres: QBWhere[];
    relations: string[];
}

export class DropFilter {
    @ApiProperty({
        name: "filter[userAddress]",
        type: "string",
        required: false,
    })
    userAddress?: string;

    static toFilterClause(filter?: DropFilter): DropFilterI {
        const qbWheres: QBWhere[] = [];
        const relations = [];
        if (filter && filter.userAddress) {
            relations.push(...["collection", "collection.user", "collection.user.address"]);
            qbWheres.push({ field: "drop.collection.user.address", operator: FilterType.EQUAL, value: filter.userAddress });
        }
        return { relations, qbWheres };
    }
}

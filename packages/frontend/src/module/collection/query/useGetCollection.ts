import { QueryOptions, QueryResult } from "query-utils";
import { CollectionDto, CollectionService } from "module/api/service";
import { useQuery } from "react-query";
import Queries from "../../../query/queries";

export default function (
    id: number | undefined,
    { enabled = true, ...restOptions }: QueryOptions<CollectionDto, unknown, CollectionDto, (Queries | number | undefined)[]> = {},
): QueryResult<CollectionDto> {
    return useQuery([Queries.COLLECTION, id], () => CollectionService.collectionControllerGetCollection(id!), {
        enabled: id !== undefined && enabled,
        ...restOptions,
    });
}

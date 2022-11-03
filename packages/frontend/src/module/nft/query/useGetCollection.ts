import { QueryResult } from "query-utils";
import { CollectionDto, CollectionService } from "module/api/service";
import { useQuery } from "react-query";
import Queries from "../../../query/queries";

export default function (id?: number): QueryResult<CollectionDto> {
    return useQuery([Queries.COLLECTION, id], () => CollectionService.collectionControllerGetCollection(id!), {
        enabled: id !== undefined,
    });
}

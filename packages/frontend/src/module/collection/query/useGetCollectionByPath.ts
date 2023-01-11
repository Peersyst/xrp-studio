import { QueryResult } from "query-utils";
import { CollectionDto, CollectionService } from "module/api/service";
import { useQuery } from "react-query";
import Queries from "../../../query/queries";

export default function (path: string | undefined): QueryResult<CollectionDto> {
    return useQuery([Queries.COLLECTION, path], () => CollectionService.collectionControllerGetCollectionByPath(path!), {
        enabled: path !== undefined,
    });
}

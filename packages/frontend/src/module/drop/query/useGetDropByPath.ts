import { QueryResult } from "query-utils";
import { DropDto, DropService } from "module/api/service";
import { useQuery } from "react-query";
import Queries from "../../../query/queries";

export default function (path: string | undefined): QueryResult<DropDto> {
    return useQuery([Queries.DROP, path], () => DropService.dropControllerGetDropByPath(path!), {
        enabled: path !== undefined,
    });
}

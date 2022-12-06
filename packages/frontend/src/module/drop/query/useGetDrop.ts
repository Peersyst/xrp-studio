import { QueryResult } from "query-utils";
import { DropDto, DropService } from "module/api/service";
import { useQuery } from "react-query";
import Queries from "../../../query/queries";

export default function (id: number | undefined): QueryResult<DropDto> {
    return useQuery([Queries.DROP, id], () => DropService.dropControllerGetDrop(id!), {
        enabled: id !== undefined,
    });
}

import { QueryResult } from "query-utils";
import { DropService } from "module/api/service";
import { useQuery } from "react-query";
import Queries from "../../../query/queries";

export default function (id: number | undefined): QueryResult<boolean> {
    return useQuery(
        [Queries.COLLECTION_IS_DROP, id],
        async () => {
            try {
                await DropService.dropControllerGetDrop(id!);
                return true;
            } catch (e) {
                return false;
            }
        },
        {
            enabled: id !== undefined,
            cacheTime: 0,
        },
    );
}

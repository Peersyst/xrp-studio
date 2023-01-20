import { useQuery, UseQueryResult } from "react-query";
import { CollectionService } from "module/api/service";
import Queries from "../../../query/queries";

export default function (name?: string): UseQueryResult<boolean> {
    return useQuery(
        [Queries.COLLECTION_NAME_AVAILABILITY, name],
        async () => {
            const res = await CollectionService.collectionControllerCollectionNameAvailability(name!);
            return res.available;
        },
        {
            enabled: !!name,
            cacheTime: 0,
        },
    );
}

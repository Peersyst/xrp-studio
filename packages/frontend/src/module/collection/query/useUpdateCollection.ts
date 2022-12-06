import { CollectionDto, CollectionService, UpdateCollectionRequest } from "module/api/service";
import { useMutation, UseMutationResult, useQueryClient } from "react-query";
import Queries from "../../../query/queries";

export interface UseUpdateCollectionParams {
    id: number;
    collection: UpdateCollectionRequest;
    publish?: boolean;
}

export default function (): UseMutationResult<CollectionDto, unknown, UseUpdateCollectionParams> {
    const queryClient = useQueryClient();

    return useMutation(
        async ({ id, collection, publish }: UseUpdateCollectionParams) =>
            CollectionService.collectionControllerUpdateCollection(id, collection, publish),
        {
            onSuccess: async (_, { id }) => {
                await queryClient.invalidateQueries(Queries.COLLECTIONS);
                await queryClient.invalidateQueries([Queries.COLLECTION, id]);
            },
        },
    );
}

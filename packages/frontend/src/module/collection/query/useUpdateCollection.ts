import { CollectionService, UpdateCollectionRequest } from "module/api/service";
import { useMutation, UseMutationResult, useQueryClient } from "react-query";
import Queries from "../../../query/queries";

export interface UseUpdateCollectionParams {
    id: number;
    collection: UpdateCollectionRequest;
}

export default function (): UseMutationResult<void, unknown, UseUpdateCollectionParams> {
    const queryClient = useQueryClient();

    return useMutation(
        async ({ id, collection }: UseUpdateCollectionParams) => {
            await CollectionService.collectionControllerUpdateCollection(id, collection);
        },
        {
            onSuccess: async (_, { id }) => {
                await queryClient.invalidateQueries(Queries.COLLECTIONS);
                await queryClient.invalidateQueries([Queries.COLLECTION, id]);
            },
        },
    );
}

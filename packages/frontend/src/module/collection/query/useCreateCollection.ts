import { useMutation, UseMutationResult, useQueryClient } from "react-query";
import { CollectionDto, CollectionService, CreateCollectionRequest } from "module/api/service";
import Queries from "../../../query/queries";

export interface UseCreateCollectionParams {
    collection: CreateCollectionRequest;
    publish: boolean;
}

export default function (): UseMutationResult<CollectionDto, unknown, UseCreateCollectionParams> {
    const queryClient = useQueryClient();

    return useMutation(
        async ({ collection, publish }: UseCreateCollectionParams) =>
            CollectionService.collectionControllerCreateCollection(collection, publish),
        {
            onSuccess: async () => {
                await queryClient.invalidateQueries(Queries.COLLECTIONS);
                await queryClient.invalidateQueries(Queries.NFT_DRAFTS);
                await queryClient.invalidateQueries(Queries.NFTS);
            },
        },
    );
}

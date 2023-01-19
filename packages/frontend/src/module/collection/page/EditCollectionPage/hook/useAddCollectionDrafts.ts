import { CollectionDto, CollectionService, CreateCollectionNftRequest } from "module/api/service";
import { useMutation, useQueryClient } from "react-query";
import Queries from "../../../../../query/queries";

export default function (collection: CollectionDto | undefined) {
    const queryClient = useQueryClient();

    const addCollectionDrafts = async (drafts: CreateCollectionNftRequest[]) => {
        if (!collection) return;

        await CollectionService.collectionControllerUpdateCollection(
            collection.id,
            {
                header: collection.header || undefined,
                image: collection.image || undefined,
                name: collection.name || undefined,
                description: collection.description || undefined,
                nfts: drafts,
            },
            false,
        );
    };

    return useMutation(addCollectionDrafts, {
        onSuccess: () => {
            queryClient.invalidateQueries([Queries.MY_NFTS]);
        },
    });
}

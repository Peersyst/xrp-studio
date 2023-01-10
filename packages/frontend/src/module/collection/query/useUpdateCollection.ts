import { CollectionDto, CollectionService, UpdateCollectionRequest } from "module/api/service";
import { useMutation, UseMutationResult, useQueryClient } from "react-query";
import Queries from "../../../query/queries";
import { config } from "config";
import { AppError } from "../../../query/AppError";
import useCheckBalance from "module/wallet/hook/useCheckBalance";

export interface UseUpdateCollectionParams {
    id: number;
    collection: UpdateCollectionRequest;
}

export interface UseUpdateCollectionProps {
    publish: boolean;
}

export default function ({ publish }: UseUpdateCollectionProps): UseMutationResult<CollectionDto, unknown, UseUpdateCollectionParams> {
    const queryClient = useQueryClient();

    const checkBalance = useCheckBalance();

    return useMutation(
        async ({ id, collection }: UseUpdateCollectionParams) => {
            if (publish) {
                const savedCollection = await CollectionService.collectionControllerGetCollection(id);
                const allDrafts = [
                    ...(savedCollection?.nfts || []).filter((nft) => nft.status !== "confirmed" && nft.status !== "pending"),
                    // Should be guaranteed by precondition
                    ...collection.nfts!,
                ];
                const amount = allDrafts.length * config.feeInDrops;
                const valid = amount && (await checkBalance(amount));
                if (!valid) throw new AppError("notEnoughBalance");
            }

            return CollectionService.collectionControllerUpdateCollection(id, collection, publish);
        },
        {
            onSuccess: async (_, { id }) => {
                await queryClient.invalidateQueries([Queries.COLLECTIONS]);
                await queryClient.invalidateQueries([Queries.COLLECTION, id]);
                await queryClient.invalidateQueries([Queries.NFT_DRAFTS]);
                await queryClient.invalidateQueries([Queries.NFTS]);
            },
        },
    );
}

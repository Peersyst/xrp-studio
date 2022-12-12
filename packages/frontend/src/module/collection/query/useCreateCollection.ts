import { useMutation, UseMutationResult, useQueryClient } from "react-query";
import { CollectionDto, CollectionService, CreateCollectionRequest } from "module/api/service";
import Queries from "../../../query/queries";
import useCheckBalance from "module/wallet/hook/useCheckBalance";
import { config } from "config";
import { AppError } from "../../../query/AppError";

export interface UseCreateCollectionParams {
    collection: CreateCollectionRequest;
}

export interface UseCreateCollectionProps {
    publish: boolean;
}

export default function ({ publish }: UseCreateCollectionProps): UseMutationResult<CollectionDto, unknown, UseCreateCollectionParams> {
    const queryClient = useQueryClient();

    const checkBalance = useCheckBalance();

    return useMutation(
        async ({ collection }: UseCreateCollectionParams) => {
            if (publish) {
                // Should be guaranteed by precondition
                const nfts = collection.nfts!;
                const amount = nfts.length * config.feeInDrops;
                const valid = amount && (await checkBalance(amount));
                if (!valid) throw new AppError("notEnoughBalance");
            }
            return CollectionService.collectionControllerCreateCollection(collection, publish);
        },
        {
            onSuccess: async () => {
                await queryClient.invalidateQueries(Queries.COLLECTIONS);
                await queryClient.invalidateQueries(Queries.NFT_DRAFTS);
                await queryClient.invalidateQueries(Queries.NFTS);
            },
        },
    );
}

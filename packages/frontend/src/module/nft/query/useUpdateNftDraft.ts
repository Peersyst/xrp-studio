import { useMutation, UseMutationResult, useQueryClient } from "react-query";
import { NftService, UpdateNftDraftRequest } from "module/api/service";
import Queries from "../../../query/queries";

export interface UseUpdateNftDraftParams extends UpdateNftDraftRequest {
    id: number;
    publish?: boolean;
}

export default function (): UseMutationResult<void, unknown, UseUpdateNftDraftParams> {
    const queryClient = useQueryClient();

    return useMutation(({ id, publish, ...nftDraft }) => NftService.nftControllerUpdateNftDraft(id, nftDraft, publish), {
        onSuccess: async (_, { id }) => {
            await queryClient.invalidateQueries(Queries.NFTS);
            await queryClient.invalidateQueries(Queries.NFT_DRAFTS);
            await queryClient.invalidateQueries([Queries.NFT_DRAFT, id]);
            await queryClient.invalidateQueries(Queries.COLLECTIONS);
            await queryClient.invalidateQueries(Queries.COLLECTION);
        },
    });
}

import { useMutation, UseMutationResult, useQueryClient } from "react-query";
import { CreateNftDraftRequest, NftDraftDto, NftService } from "module/api/service";
import Queries from "../../../query/queries";

export default function (): UseMutationResult<NftDraftDto, unknown, CreateNftDraftRequest> {
    const queryClient = useQueryClient();

    return useMutation(NftService.nftControllerCreateNftDraft, {
        onSuccess: async ({ id }) => {
            await queryClient.invalidateQueries([Queries.NFT_DRAFT, id]);
            await queryClient.invalidateQueries([Queries.NFT_DRAFTS]);
            await queryClient.invalidateQueries([Queries.COLLECTIONS]);
            await queryClient.invalidateQueries([Queries.COLLECTION]);
        },
    });
}

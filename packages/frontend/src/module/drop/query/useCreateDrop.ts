import { useMutation, UseMutationResult, useQueryClient } from "react-query";
import { CreateDropRequest, DropDto, DropService } from "module/api/service";
import Queries from "../../../query/queries";

export interface UseCreateDropParams {
    request: CreateDropRequest;
}

export default function (): UseMutationResult<DropDto, unknown, UseCreateDropParams> {
    const queryClient = useQueryClient();

    return useMutation(
        async ({ request }: UseCreateDropParams) => {
            return DropService.dropControllerPublishDrop(request);
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

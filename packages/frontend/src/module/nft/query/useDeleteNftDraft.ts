import { useMutation, UseMutationResult, useQueryClient } from "react-query";
import { NftService } from "module/api/service";
import Queries from "../../../query/queries";

export default function (): UseMutationResult<void, unknown, number> {
    const queryClient = useQueryClient();

    return useMutation((id: number) => NftService.nftControllerDeleteNftDraft(id), {
        onSuccess: (_, id) => {
            queryClient.invalidateQueries([Queries.MY_NFTS]);
            queryClient.invalidateQueries([Queries.NFTS]);
            queryClient.invalidateQueries([Queries.NFT_DRAFT, id]);
        },
    });
}

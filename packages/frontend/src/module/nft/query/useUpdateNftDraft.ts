import { useMutation, UseMutationResult } from "react-query";
import { NftService, UpdateNftDraftRequest } from "module/api/service";

export interface UseUpdateNftDraftParams extends UpdateNftDraftRequest {
    id: number;
    publish?: boolean;
}

export default function (): UseMutationResult<void, unknown, UseUpdateNftDraftParams> {
    return useMutation("aaa", ({ id, publish, ...nftDraft }) => NftService.nftControllerUpdateNftDraft(id, nftDraft, publish));
}

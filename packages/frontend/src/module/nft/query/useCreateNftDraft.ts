import { useMutation, UseMutationResult } from "react-query";
import { CreateNftDraftRequest, NftDraftDto, NftService } from "module/api/service";

export default function (): UseMutationResult<NftDraftDto, unknown, CreateNftDraftRequest> {
    return useMutation(NftService.nftControllerCreateNftDraft);
}

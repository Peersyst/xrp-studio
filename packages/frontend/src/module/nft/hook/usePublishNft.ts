import useCreateNft from "module/nft/query/useCreateNft";
import useUpdateNftDraft from "module/nft/query/useUpdateNftDraft";
import useCheckBalance from "module/wallet/hook/useCheckBalance";
import { CreateNftDraftRequest } from "module/api/service";
import { useMutation, UseMutationResult } from "react-query";
import Queries from "../../../query/queries";
import { AppError } from "../../../query/AppError";

export default function (request: CreateNftDraftRequest, draftId?: number): UseMutationResult<number | undefined, string> {
    const checkBalance = useCheckBalance();

    const { mutateAsync: createNft } = useCreateNft();
    const { mutateAsync: updateNftDraft } = useUpdateNftDraft();

    const publish = async () => {
        const hasBalance = await checkBalance();

        if (!hasBalance) throw new AppError("notEnoughBalance");
        else {
            if (draftId) {
                await updateNftDraft({ id: draftId, publish: true, ...request });
                return draftId;
            } else {
                const response = await createNft(request);
                return response.id;
            }
        }
    };

    return useMutation([Queries.PUBLISH_NFT], publish);
}

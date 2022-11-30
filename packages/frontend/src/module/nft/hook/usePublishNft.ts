import useCreateNft from "module/nft/query/useCreateNft";
import useUpdateNftDraft from "module/nft/query/useUpdateNftDraft";
import useTranslate from "module/common/hook/useTranslate";
import useCheckBalance from "module/wallet/hook/useCheckBalance";
import { CreateNftDraftRequest } from "module/api/service";
import { useMutation, UseMutationResult } from "react-query";
import Queries from "../../../query/queries";

export default function (request: CreateNftDraftRequest, draftId?: number): UseMutationResult<number | undefined, string> {
    const checkBalance = useCheckBalance();
    const translateError = useTranslate("error");

    const { mutateAsync: createNft } = useCreateNft();
    const { mutateAsync: updateNftDraft } = useUpdateNftDraft();

    const publish = async () => {
        const hasBalance = await checkBalance();

        if (!hasBalance) throw new Error(translateError("notEnoughBalance"));
        else {
            if (draftId) await updateNftDraft({ id: draftId, publish: true, ...request });
            else {
                const response = await createNft(request);
                return response.id;
            }
        }
    };

    return useMutation([Queries.PUBLISH_NFT], publish);
}

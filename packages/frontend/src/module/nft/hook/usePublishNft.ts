import useCreateNft from "module/nft/query/useCreateNft";
import useUpdateNftDraft from "module/nft/query/useUpdateNftDraft";
import { useToast } from "@peersyst/react-components";
import useTranslate from "module/common/hook/useTranslate";
import useCheckBalance from "module/wallet/hook/useCheckBalance";
import { CreateNftDraftRequest } from "module/api/service";
import useNftStatePooling from "module/nft/hook/useNftStatePooling";

export interface UsePublishNftReturn {
    publish: () => Promise<void>;
    isPublishing: boolean;
    isPooling: boolean;
    endPooling: () => void;
}

export function usePublishNft(request: CreateNftDraftRequest, draftId?: number): UsePublishNftReturn {
    const translateError = useTranslate("error");
    const { showToast } = useToast();
    const checkBalance = useCheckBalance();

    const { mutate: createNft, isLoading: createNftLoading } = useCreateNft();
    const { mutate: updateNftDraft, isLoading: updateNftDraftLoading, variables } = useUpdateNftDraft();
    const { isPooling, endPooling } = useNftStatePooling();

    const publishing = createNftLoading || (updateNftDraftLoading && !!variables?.publish);
    const publish = async () => {
        const hasBalance = await checkBalance();
        if (!hasBalance) showToast(translateError("notEnoughBalance"), { type: "error" });
        else {
            if (draftId) updateNftDraft({ id: draftId, publish: true, ...request });
            else {
                createNft(request);
            }
        }
    };

    return {
        publish,
        isPublishing: publishing,
        isPooling,
        endPooling,
    };
}

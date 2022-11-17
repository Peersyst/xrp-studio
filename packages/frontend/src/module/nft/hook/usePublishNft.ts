import useCreateNft from "module/nft/query/useCreateNft";
import useUpdateNftDraft from "module/nft/query/useUpdateNftDraft";
import { useToast } from "@peersyst/react-components";
import useTranslate from "module/common/hook/useTranslate";
import usePublishNftState from "./usePublishNftState";
import useCheckBalance from "module/wallet/hook/useCheckBalance";

export interface UsePublishNftReturn {
    handlePublish: () => Promise<void>;
    isPublishing: boolean;
}

export function usePublishNft(onPublish?: () => void, onClose?: () => void): UsePublishNftReturn {
    const translateError = useTranslate("error");
    const { showToast } = useToast();
    const checkBalance = useCheckBalance();
    const [{ data: requestNft, nftDraftId: nftDraftId }] = usePublishNftState();

    const { mutate: createNft, isLoading: createNftLoading } = useCreateNft();
    const { mutate: updateNftDraft, isLoading: updateNftDraftLoading, variables } = useUpdateNftDraft();

    const publishing = createNftLoading || (updateNftDraftLoading && !!variables?.publish);
    const handlePublish = async () => {
        const hasBalance = await checkBalance();
        if (!hasBalance) showToast(translateError("notEnoughBalance"), { type: "error" });
        else {
            if (nftDraftId) {
                updateNftDraft({ id: nftDraftId, publish: true, ...requestNft });
                onClose?.();
            } else {
                createNft(requestNft);
                onPublish?.();
            }
        }
    };

    return {
        handlePublish,
        isPublishing: publishing,
    };
}

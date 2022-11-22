import useCreateNft from "module/nft/query/useCreateNft";
import useUpdateNftDraft from "module/nft/query/useUpdateNftDraft";
import { useToast } from "@peersyst/react-components";
import useTranslate from "module/common/hook/useTranslate";
import useCheckBalance from "module/wallet/hook/useCheckBalance";
import { CreateNftDraftRequest, NftDto, NftService } from "module/api/service";
import { useState } from "react";
import config from "config/config";

export interface UsePublishNftReturn {
    publish: () => Promise<void>;
    endPolling: () => void;
    startPolling: () => Promise<string>;
    onPollingError: (error: string) => void;
    isPolling: boolean;
    isPublishing: boolean;
    pollingError: string | null;
}

export function usePublishNft(request: CreateNftDraftRequest, draftId?: number): UsePublishNftReturn {
    const translateError = useTranslate("error");
    const { showToast } = useToast();
    const checkBalance = useCheckBalance();

    const [xummTransactionUuid, setXummTransactionUuid] = useState("");
    const [isPolling, setIsPolling] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const { mutate: createNft, isLoading: createNftLoading } = useCreateNft();
    const { mutate: updateNftDraft, isLoading: updateNftDraftLoading, variables } = useUpdateNftDraft();

    const mockCreateNft = async (request: CreateNftDraftRequest) => {
        return "uuid";
    };

    const publishing = createNftLoading || (updateNftDraftLoading && !!variables?.publish);
    const publish = async () => {
        const hasBalance = await checkBalance();
        if (!hasBalance) showToast(translateError("notEnoughBalance"), { type: "error" });
        else {
            if (draftId) updateNftDraft({ id: draftId, publish: true, ...request });
            else {
                //createNft(request);
                const uuid = await mockCreateNft(request);
                setXummTransactionUuid(uuid);
            }
        }
    };

    const pollNftState = async (delay = 1000, i = 0): Promise<NftDto["status"]> => {
        /* Mocked condition */
        //return "confirmed";
        throw new Error("hey");
        /* Original function */
        if (i === config.maxPollingIterations) throw new Error("Maximum calls made");
        const res = await NftService.nftControllerGetNftDraftStatus(undefined, [1]);
        const status = res[0].status;
        if (res[0].status === "pending")
            return new Promise<NftDto["status"]>((resolve) => {
                setTimeout(async () => {
                    const status = await pollNftState(delay, i + 1);
                    resolve(status);
                }, delay);
            });
        if (res[0].status === "failed") throw new Error("Failed in transaction");
        else return status;
    };

    const startPolling = async () => {
        return await pollNftState();
    };

    const endPolling = () => {
        setIsPolling(false);
    };

    const onPollingError = (error: string) => {
        setError(error);
        setIsPolling(false);
    };

    return {
        publish,
        startPolling,
        endPolling,
        onPollingError,
        isPublishing: publishing,
        isPolling,
        pollingError: error,
    };
}

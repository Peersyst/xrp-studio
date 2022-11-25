import { useMutation, UseMutationResult } from "react-query";
import { NftDto, NftService } from "module/api/service";
import config from "config/config";
import useTranslate from "module/common/hook/useTranslate";

export default function (): UseMutationResult<NftDto["status"], string, number> {
    const translateError = useTranslate("error");

    async function nftPollingRequest(delay = 1000, i = 0, id: number) {
        if (i === config.maxPollingIterations) throw new Error(translateError("maxPollingCalls"));
        const res = await NftService.nftControllerGetNftDraftStatus(undefined, [id]);
        const status = res[0].status;
        if (res[0].status === "pending")
            return new Promise<NftDto["status"]>((resolve, reject) => {
                setTimeout(async () => {
                    const status = await nftPollingRequest(delay, i + 1, id).catch((e) => reject(e));
                    if (status) resolve(status);
                }, delay);
            });
        else return status;
    }

    return useMutation(["nft-state-polling"], (id) => nftPollingRequest(1000, 0, id));
}

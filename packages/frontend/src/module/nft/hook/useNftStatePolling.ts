import { NftDraftStatusDto, NftService } from "module/api/service";
import { polling } from "@peersyst/react-utils";
import useTranslate from "module/common/hook/useTranslate";

export interface UseNftStatePollingOptions {
    onSuccess?: () => void;
}

export interface UseNftStatePollingResult {
    fetch: () => Promise<NftDraftStatusDto[] | undefined>;
}

export default function (id: undefined | number, { onSuccess }: UseNftStatePollingOptions = {}): UseNftStatePollingResult {
    const translate = useTranslate("error");

    const handleStatus = (res: NftDraftStatusDto[]) => {
        const status = res[0].status;
        if (status === "failed") throw new Error(translate("nftMinting"));
        return status === "pending";
    };

    const fetch = async (): Promise<NftDraftStatusDto[] | undefined> => {
        if (id) {
            await polling(() => NftService.nftControllerGetNftDraftStatus(undefined, [id]), handleStatus);
            onSuccess?.();
        }
        return undefined;
    };

    return {
        fetch,
    };
}

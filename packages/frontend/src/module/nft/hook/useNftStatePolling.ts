import { NftDraftStatusDto, NftService } from "module/api/service";
import { polling } from "@peersyst/react-utils";
import { AppError } from "../../../query/AppError";

export interface UseNftStatePollingOptions {
    onSuccess?: () => void;
}

export interface UseNftStatePollingResult {
    fetch: () => Promise<NftDraftStatusDto[] | undefined>;
}

export default function (id: undefined | number, { onSuccess }: UseNftStatePollingOptions = {}): UseNftStatePollingResult {
    const handleStatus = (res: NftDraftStatusDto[]) => {
        const status = res[0].status;
        if (status === "failed") throw new AppError("nftMinting");
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

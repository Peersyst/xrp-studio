import { NftDraftStatusDto, NftService } from "module/api/service";
import { polling } from "@peersyst/react-utils";
import useTranslate from "module/common/hook/useTranslate";

export interface UseNftStatePolling {
    fetch: () => Promise<NftDraftStatusDto[]> | undefined;
}

export default function (id: undefined | number): UseNftStatePolling {
    const translate = useTranslate("error");

    const handleStatus = (res: NftDraftStatusDto[]) => {
        const status = res[0].status;
        if (status === "failed") throw new Error(translate("nftMinting"));
        return status === "pending";
    };

    const fetch = (): Promise<NftDraftStatusDto[]> | undefined => {
        if (id) return polling(() => NftService.nftControllerGetNftDraftStatus(undefined, [id]), handleStatus);
        return undefined;
    };

    return {
        fetch,
    };
}

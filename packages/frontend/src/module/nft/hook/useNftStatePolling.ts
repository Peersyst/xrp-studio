import { NftDraftDto, NftDraftStatusDto, NftService } from "module/api/service";
import { useState } from "react";
import { polling } from "@peersyst/react-utils";

export interface UseNftStatePolling {
    fetch: () => Promise<NftDraftStatusDto[]> | undefined;
    nftStatus: NftDraftDto["status"] | undefined;
}

export default function (id: undefined | number): UseNftStatePolling {
    const [nftStatus, setNftStatus] = useState<NftDraftDto["status"] | undefined>();

    const handleStatus = (res: NftDraftStatusDto[]) => {
        const status = res[0].status;
        setNftStatus(status);
        return status === "pending";
    };

    const fetch = (): Promise<NftDraftStatusDto[]> | undefined => {
        if (id) return polling(() => NftService.nftControllerGetNftDraftStatus(undefined, [id]), handleStatus);
        return undefined;
    };

    return {
        fetch,
        nftStatus,
    };
}

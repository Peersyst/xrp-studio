import { NftDto, XummService } from "module/api/service";
import { polling } from "@peersyst/react-utils";

export interface UseNftStatePolling {
    fetch: () => Promise<NftDto> | undefined;
}

export default function (xummRequestUuid: undefined | string): UseNftStatePolling {
    const handleStatus = (res: NftDto) => {
        return res.status === "pending";
    };

    const fetch = (): Promise<NftDto> | undefined => {
        if (xummRequestUuid) return polling(() => XummService.xummControllerGetStatusByUuid(xummRequestUuid), handleStatus);
        return undefined;
    };

    return {
        fetch,
    };
}

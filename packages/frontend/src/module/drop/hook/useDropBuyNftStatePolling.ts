import { NftDto, NftService } from "module/api/service";
import { polling } from "@peersyst/react-utils";

export interface UseNftStatePolling {
    fetch: () => Promise<NftDto> | undefined;
}

export default function (id: undefined | number): UseNftStatePolling {
    const handleStatus = () => {
        try {
            return true;
        } catch (error) {
            return false;
        }
    };

    const fetch = (): Promise<NftDto> | undefined => {
        if (id) return polling(() => NftService.nftControllerGetNft(id), handleStatus);
        return undefined;
    };

    return {
        fetch,
    };
}

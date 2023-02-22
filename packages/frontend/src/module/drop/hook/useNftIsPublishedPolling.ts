import { NftDto, NftService } from "module/api/service";
import timeoutPolling from "module/common/util/timeoutPolling";

export interface UseNftStatePolling {
    fetch: () => Promise<NftDto | undefined> | undefined;
}

export default function (id: undefined | number): UseNftStatePolling {
    const handleCall = async (id: number) => {
        try {
            return await NftService.nftControllerGetNft(id);
        } catch (error) {
            return undefined;
        }
    };

    const handleStatus = (nft: NftDto | undefined) => {
        return !nft;
    };

    const fetch = (): Promise<NftDto | undefined> | undefined => {
        if (id) return timeoutPolling(() => handleCall(id), handleStatus);
        return undefined;
    };

    return {
        fetch,
    };
}

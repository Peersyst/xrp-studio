import { NftDto, NftService } from "module/api/service";
import { polling } from "@peersyst/react-utils";

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
        if (id) return polling(() => handleCall(id), handleStatus);
        return undefined;
    };

    return {
        fetch,
    };
}

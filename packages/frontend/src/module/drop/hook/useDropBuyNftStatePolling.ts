import { DropDto, DropService } from "module/api/service";
import { polling } from "@peersyst/react-utils";

export interface UseNftStatePolling {
    fetch: () => Promise<DropDto> | undefined;
}

export default function (id: undefined | number, address: string): UseNftStatePolling {
    const handleStatus = (res: DropDto) => {
        return res.collection?.account === address;
    };

    const fetch = (): Promise<DropDto> | undefined => {
        if (id) return polling(() => DropService.dropControllerGetDrop(id), handleStatus);
        return undefined;
    };

    return {
        fetch,
    };
}

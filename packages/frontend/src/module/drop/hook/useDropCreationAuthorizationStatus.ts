import { polling } from "@peersyst/react-utils";
import XrplService from "module/blockchain/service/XrplService/XrplService";
import { useConfig } from "@peersyst/react-components";

export interface UseDropCreationAuthorizationStatusResult {
    fetch: () => Promise<boolean> | undefined;
}

export default function (creatorAddress: string): UseDropCreationAuthorizationStatusResult {
    const minterAddress = useConfig("dropMinterAddress");

    const xrplService = new XrplService();

    const fetch = (): Promise<boolean> | undefined => {
        return polling(
            async () => await xrplService.isAuthorized(creatorAddress, minterAddress),
            (res: boolean) => !res,
        );
    };

    return {
        fetch,
    };
}

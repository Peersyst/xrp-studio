import XrplService from "module/blockchain/service/XrplService/XrplService";
import { useConfig } from "@peersyst/react-components";
import useMintAuthorization from "module/drop/hook/useMintAuthorization";
import timeoutPolling from "module/common/util/timeoutPolling";

export interface UseDropCreationAuthorizationStatusResult {
    fetch: () => Promise<boolean | undefined>;
}

export default function (creatorAddress: string): UseDropCreationAuthorizationStatusResult {
    const minterAddress = useConfig("dropMinterAddress");

    const { mutateAsync: requestMintAuthorization } = useMintAuthorization();

    const fetch = async (): Promise<boolean | undefined> => {
        const isAuthorized = await XrplService.isAuthorized(creatorAddress, minterAddress);

        if (isAuthorized) return true;

        await requestMintAuthorization();

        return timeoutPolling(
            async () => await XrplService.isAuthorized(creatorAddress, minterAddress),
            (res: boolean) => !res,
        );
    };

    return {
        fetch,
    };
}

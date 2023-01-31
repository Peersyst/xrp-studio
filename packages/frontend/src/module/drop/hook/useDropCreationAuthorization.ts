import { polling } from "@peersyst/react-utils";
import XrplService from "module/blockchain/service/XrplService/XrplService";
import { useConfig } from "@peersyst/react-components";
import useMintAuthorization from "module/drop/hook/useMintAuthorization";

export interface UseDropCreationAuthorizationStatusResult {
    fetch: () => Promise<boolean>;
}

export default function (creatorAddress: string): UseDropCreationAuthorizationStatusResult {
    const minterAddress = useConfig("dropMinterAddress");

    const { mutateAsync: requestMintAuthorization } = useMintAuthorization();

    const fetch = async (): Promise<boolean> => {
        const isAuthorized = await XrplService.isAuthorized(creatorAddress, minterAddress);

        if (isAuthorized) return true;

        await requestMintAuthorization();

        return polling(
            async () => await XrplService.isAuthorized(creatorAddress, minterAddress),
            (res: boolean) => !res,
        );
    };

    return {
        fetch,
    };
}

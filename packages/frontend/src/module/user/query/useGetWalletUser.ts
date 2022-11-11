import { UseQueryResult } from "react-query";
import { UserDto } from "module/api/service";
import useWallet from "module/wallet/hook//useWallet";
import useGetUser from "./useGetUser";

const useGetWalletUser = (): UseQueryResult<UserDto> => {
    const { address } = useWallet();
    /* eslint-disable no-console*/
    if (!address) console.warn("WARNING [useGetWalletUser]: address is undefined.");
    return useGetUser(address);
};

export default useGetWalletUser;

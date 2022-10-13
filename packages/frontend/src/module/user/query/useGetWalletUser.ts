import { UseQueryResult } from "react-query";
import { UserDto } from "module/api/service";
import useWallet from "module/wallet/component/hooks/useWallet";
import useGetUser from "./useGetUser";

const useGetWalletUser = (): UseQueryResult<UserDto> => {
    const { address } = useWallet();
    return useGetUser(address);
};

export default useGetWalletUser;

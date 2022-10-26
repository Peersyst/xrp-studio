import { useQuery, UseQueryResult } from "react-query";
import { UserDto, UserService } from "module/api/service";
import Queries from "../../../query/queries";
import { useGetUserAddress } from "../hook/useGetUserAddress";

const useGetUser = (address?: string): UseQueryResult<UserDto> => {
    const paramsAddress = useGetUserAddress();
    const usedAddress = address || paramsAddress;
    return useQuery([Queries.USER, usedAddress], () => UserService.userControllerGetUser(usedAddress!), { enabled: !!usedAddress });
};

export default useGetUser;

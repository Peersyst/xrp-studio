import { useQuery, UseQueryResult } from "react-query";
import { useParams } from "react-router-dom";
import { UserDto, UserService } from "module/api/service";
import Queries from "../../../query/queries";

const useGetUser = (address?: string): UseQueryResult<UserDto> => {
    const { address: paramsAddress } = useParams<string>();

    const usedAddress = address || paramsAddress;

    return useQuery([Queries.GET_USER, usedAddress], () => UserService.userControllerGetUser(usedAddress!), { enabled: !!usedAddress });
};

export default useGetUser;

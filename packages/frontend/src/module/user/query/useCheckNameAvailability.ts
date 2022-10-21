import { useQuery, UseQueryResult } from "react-query";
import { ExistDto, UserService } from "module/api/service";
import Queries from "../../../query/queries";

const useCheckNameAvailability = (name?: string): UseQueryResult<ExistDto> => {
    return useQuery([Queries.NAME_AVAILABILITY, name], () => UserService.userControllerCheckUserName(name!), {
        enabled: !!name,
        cacheTime: 0,
    });
};

export default useCheckNameAvailability;
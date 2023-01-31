import { useQuery, UseQueryResult } from "react-query";
import { AvailabilityDto, UserService } from "module/api/service";
import Queries from "../../../query/queries";

const useCheckNameAvailability = (name?: string): UseQueryResult<AvailabilityDto> => {
    return useQuery([Queries.NAME_AVAILABILITY, name], () => UserService.userControllerUserNameAvailability(name!), {
        enabled: !!name,
        cacheTime: 0,
    });
};

export default useCheckNameAvailability;

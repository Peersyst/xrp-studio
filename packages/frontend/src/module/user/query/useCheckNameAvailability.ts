import { useQuery, UseQueryResult } from "react-query";
import { UserService, ValidDto } from "module/api/service";
import Queries from "../../../query/queries";

const useCheckNameAvailability = (name?: string): UseQueryResult<ValidDto> => {
    return useQuery([Queries.GET_NAME_AVAILABILITY, name], () => UserService.userControllerCheckUserName(name!), {
        enabled: !!name,
    });
};

export default useCheckNameAvailability;

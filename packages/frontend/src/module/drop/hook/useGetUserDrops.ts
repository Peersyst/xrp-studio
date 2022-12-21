import { UseInfiniteQueryResult } from "react-query/types/react/types";
import { PaginatedDropDto } from "module/api/service/models/PaginatedDropDto";
import useGetDrops from "module/drop/hook/useGetDrops";
import { useGetUserAddress } from "module/user/hook/useGetUserAddress";

export default function (addressParams?: string): UseInfiniteQueryResult<PaginatedDropDto> {
    const address = useGetUserAddress();
    const usedAddress = address || addressParams;
    return useGetDrops({ account: usedAddress }, { enabled: !!usedAddress });
}

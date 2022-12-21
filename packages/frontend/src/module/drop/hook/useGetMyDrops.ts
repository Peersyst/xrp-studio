import { InfiniteQueryResult } from "query-utils";
import { PaginatedDropDto } from "module/api/service/models/PaginatedDropDto";
import useWallet from "module/wallet/hook/useWallet";
import useGetUserDrops from "module/drop/hook/useGetUserDrops";

export default function (): InfiniteQueryResult<PaginatedDropDto> {
    const { address } = useWallet();
    return useGetUserDrops(address);
}

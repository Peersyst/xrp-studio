import { PaginatedNftDto } from "module/api/service";
import { InfiniteQueryResult } from "query-utils";
import { useGetUserAddress } from "../hook/useGetUserAddress";
import useGetNfts, { UseGetNftsOptions } from "module/nft/query/useGetNfts";

export const useGetProfileNfts = ({ account, ...rest }: UseGetNftsOptions = {}): InfiniteQueryResult<PaginatedNftDto> => {
    const addressParams = useGetUserAddress();
    const usedAddress = account || addressParams;
    //TODO: implement profile filters
    return useGetNfts(
        { account: usedAddress, ...rest },
        {
            enabled: !!usedAddress,
        },
    );
};

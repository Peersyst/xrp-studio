import { PaginatedCollectionDto } from "module/api/service";
import { UseInfiniteQueryResult } from "query-utils";
import { useGetUserAddress } from "../hook/useGetUserAddress";
import useGetCollections, { UseGetCollectionsOptions } from "module/collection/query/useGetCollections";

export const useGetUserCollections = ({ account: addressParams, ...rest }: UseGetCollectionsOptions = {}): UseInfiniteQueryResult<
    PaginatedCollectionDto,
    unknown
> => {
    const address = useGetUserAddress();
    const usedAddress = address || addressParams;
    return useGetCollections(
        { account: usedAddress, ...rest },
        {
            enabled: !!usedAddress,
        },
    );
};

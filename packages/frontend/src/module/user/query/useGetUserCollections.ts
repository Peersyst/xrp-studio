import { PaginatedCollectionDto } from "module/api/service";
import { UseInfiniteQueryResult } from "query-utils";
import { useGetUserAddress } from "../hook/useGetUserAddress";
import useGetCollections from "module/collection/query/useGetCollections";

export const useGetUserCollections = (addressParams?: string): UseInfiniteQueryResult<PaginatedCollectionDto, unknown> => {
    const address = useGetUserAddress();
    const usedAddress = address || addressParams;
    return useGetCollections(
        { account: "rPPsMwNYkSt59j8RWJAqonUw3oVBg7kX6t" },
        {
            enabled: !!usedAddress,
        },
    );
};

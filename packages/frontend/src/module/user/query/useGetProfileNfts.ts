import { PaginatedNftDto } from "module/api/service";
import { InfiniteQueryResult } from "query-utils";
import { useGetUserAddress } from "../hook/useGetUserAddress";
import useGetNfts, { NftFilterNames, UseGetNftsOptions } from "module/nft/query/useGetNfts";
import useFilters, { BASE_FILTERS_DECLARATION, Filter } from "module/common/component/input/Filters/hooks/useFilters";

const NFT_FILTER_DECLARATION: Filter[] = [
    ...BASE_FILTERS_DECLARATION,
    {
        name: NftFilterNames.COLLECTIONS,
        array: true,
        type: "number",
    },
];

export const useGetProfileNfts = ({ account, ...rest }: UseGetNftsOptions = {}): InfiniteQueryResult<PaginatedNftDto> => {
    const addressParams = useGetUserAddress();
    const usedAddress = account || addressParams;
    const filters = useFilters(NFT_FILTER_DECLARATION);

    //TODO: implement profile filters
    return useGetNfts(
        { account: undefined, ...{ ...filters, ...rest } },
        {
            enabled: !!usedAddress,
        },
    );
};

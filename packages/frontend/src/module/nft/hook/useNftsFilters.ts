import useFilters from "module/common/component/input/Filters/hooks/useFilters/useFilters";
import { BASE_FILTERS_DECLARATION, Filter, UseFilterReturn } from "module/common/component/input/Filters/hooks/useFilters";
import { NftFilterNames } from "module/nft/query/useGetNfts";

export const NFT_FILTER_DECLARATION: Filter[] = [
    ...BASE_FILTERS_DECLARATION,
    {
        name: NftFilterNames.COLLECTIONS,
        array: true,
        type: "number",
    },
];

export default function useNftsFilters(): UseFilterReturn {
    return useFilters(NFT_FILTER_DECLARATION);
}

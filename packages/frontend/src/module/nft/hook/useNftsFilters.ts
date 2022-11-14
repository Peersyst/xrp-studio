import { NftFilterNames } from "module/nft/query/useGetNfts";
import { BASE_FILTERS_DECLARATION, BaseFilters, UseFilterReturn } from "module/common/component/input/Filters/hooks/useFilters";
import useFilters from "module/common/component/input/Filters/hooks/useFilters/useFilters";

export type NftFilters = BaseFilters & { [NftFilterNames.COLLECTIONS]: { array: true; type: "number" } };

export const NFT_FILTER_DECLARATION: NftFilters = {
    ...BASE_FILTERS_DECLARATION,
    [NftFilterNames.COLLECTIONS]: {
        array: true,
        type: "number",
    },
};

export default function useNftsFilters(): UseFilterReturn<NftFilters> {
    return useFilters<NftFilters>(NFT_FILTER_DECLARATION);
}

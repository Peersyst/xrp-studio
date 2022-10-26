import useFilters from "module/common/component/input/Filters/hooks/useFilters";
import { NftFilterNames, UseGetNftsOptions } from "module/nft/query/useGetNfts";

export interface UseCleanCollectionsReturn {
    cleanAllCollections: () => void;
    cleanCollection: (tag: number) => void;
}

export default function useCleanCollections(): UseCleanCollectionsReturn {
    const { setFilters, filters } = useFilters<UseGetNftsOptions>();
    const updateCollections = (value: number[] | undefined) => {
        setFilters({ [NftFilterNames.COLLECTIONS]: value });
    };
    const cleanAllCollections = () => updateCollections(undefined);
    const cleanCollection = (tag: number) => updateCollections(filters[NftFilterNames.COLLECTIONS]?.filter((t) => t !== tag));
    return { cleanAllCollections, cleanCollection };
}

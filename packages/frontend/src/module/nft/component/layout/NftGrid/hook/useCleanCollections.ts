import useFilters from "module/common/component/input/Filters/hooks/useFilters";
import { UseGetNftsOptions } from "module/nft/query/useGetNfts";

export interface UseCleanCollectionsReturn {
    cleanAllCollections: () => void;
    cleanCollection: (tag: number) => void;
}

export default function useCleanCollections(): UseCleanCollectionsReturn {
    const { setFilters, filters } = useFilters<UseGetNftsOptions>();
    const cleanAllCollections = () => setFilters({ ["collections"]: undefined });
    const cleanCollection = (tag: number) => setFilters({ ["collections"]: filters["collections"]?.filter((t) => t !== tag) });
    return { cleanAllCollections, cleanCollection };
}

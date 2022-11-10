import useFilter from "module/common/component/input/Filters/hooks/useFilter/useFilter";
import { NftFilterNames } from "module/nft/query/useGetNfts";

export interface UseCleanCollectionsReturn {
    cleanAllCollections: () => void;
    cleanCollection: (tag: string) => void;
}

export default function useCleanCollections(): UseCleanCollectionsReturn {
    const [collections, setFilter] = useFilter({ name: NftFilterNames.COLLECTIONS, multiple: true });
    const updateCollections = (value: string[] | undefined) => {
        setFilter(value);
    };
    const cleanAllCollections = () => updateCollections(undefined);
    const cleanCollection = (tag: string) => updateCollections(collections?.filter((t) => t !== tag));
    return { cleanAllCollections, cleanCollection };
}

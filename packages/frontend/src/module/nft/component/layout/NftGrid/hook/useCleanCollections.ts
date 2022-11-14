import useFilter from "module/common/component/input/Filters/hooks/useFilter/useFilter";
import { NftFilterNames } from "module/nft/query/useGetNfts";

export interface UseCleanCollectionsReturn {
    cleanAllCollections: () => void;
    cleanCollection: (tag: string) => void;
}

export default function useCleanCollections(): UseCleanCollectionsReturn {
    const [collections, setFilter] = useFilter<number, "multiple">(NftFilterNames.COLLECTIONS, { multiple: true });
    const updateCollections = (value: number[] | undefined) => {
        setFilter(value ? value.map((col) => col.toString()) : undefined);
    };

    const cleanAllCollections = () => updateCollections(undefined);
    const cleanCollection = (tag: string) => updateCollections(collections?.filter((t) => t.toString() !== tag));

    return { cleanAllCollections, cleanCollection };
}

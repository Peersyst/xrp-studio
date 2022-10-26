import { CollectionDto } from "module/api/service";
import useFilters from "module/common/component/input/Filters/hooks/useFilters";
import { UseGetNftsOptions } from "module/nft/query/useGetNfts";
import { useMemo } from "react";
import { NftCollectionTag } from "../NftGrid.types";

export default function useGetNftTags(collections: CollectionDto[]): NftCollectionTag[] {
    const { value: filters } = useFilters<UseGetNftsOptions>();
    const tags: NftCollectionTag[] = useMemo(() => {
        const newTags: NftCollectionTag[] = [];
        const filteredCollections = filters["collections"] || [];
        filteredCollections.forEach((filterCollectionId) => {
            const collection = collections.find((collection) => collection.id === filterCollectionId);
            if (collection) {
                newTags.push({ label: collection.name || "Col. " + collection.id, value: collection.id });
            }
        });
        return newTags;
    }, [collections, filters["collections"]]);

    return tags;
}

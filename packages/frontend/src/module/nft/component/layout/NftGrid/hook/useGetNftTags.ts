import { CollectionDto } from "module/api/service";
import useFilters from "module/common/component/input/Filters/hooks/useFilters";
import { NftFilterNames, UseGetNftsOptions } from "module/nft/query/useGetNfts";
import { useMemo } from "react";
import { NftCollectionTag } from "../NftGrid.types";

export default function useGetNftTags(collections: CollectionDto[]): NftCollectionTag[] {
    const { filters } = useFilters<UseGetNftsOptions>();
    const tags: NftCollectionTag[] = useMemo(() => {
        const newTags: NftCollectionTag[] = [];
        const filteredCollections = filters[NftFilterNames.COLLECTIONS] || [];
        filteredCollections.forEach((filterCollectionId) => {
            const collection = collections.find((collection) => collection.id === filterCollectionId);
            if (collection) {
                newTags.push({ label: collection.name || "Col. " + collection.id, value: collection.id });
            }
        });
        return newTags;
    }, [collections, filters[NftFilterNames.COLLECTIONS]]);

    return tags;
}

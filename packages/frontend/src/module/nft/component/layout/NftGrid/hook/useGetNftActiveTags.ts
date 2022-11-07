import { CollectionDto } from "module/api/service";
import useFilters from "module/common/component/input/Filters/hooks/useFilters";
import { NftFilterNames, UseGetNftsOptions } from "module/nft/query/useGetNfts";
import { useMemo } from "react";
import { NftCollectionTag } from "../NftGrid.types";
import getCollectionTag from "../util/getCollectionTag";

export default function useGetNftActiveTags(collections: CollectionDto[]): NftCollectionTag[] {
    const [filters] = useFilters<UseGetNftsOptions["collections"]>(NftFilterNames.COLLECTIONS);
    const tags: NftCollectionTag[] = useMemo(() => {
        const newTags: NftCollectionTag[] = [];
        const filteredCollections = filters || [];
        filteredCollections.forEach((filterCollectionId) => {
            const collection = collections.find((collection) => collection.id === filterCollectionId);
            if (collection) newTags.push(getCollectionTag(collection));
        });
        return newTags;
    }, [collections, filters]);

    return tags;
}

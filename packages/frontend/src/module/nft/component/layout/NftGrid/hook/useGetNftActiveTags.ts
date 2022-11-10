import { CollectionDto } from "module/api/service";
import useFilter from "module/common/component/input/Filters/hooks/useFilter/useFilter";
import { NftFilterNames } from "module/nft/query/useGetNfts";
import { useMemo } from "react";
import { NftCollectionTag } from "../NftGrid.types";
import getCollectionTag from "../util/getCollectionTag";

export default function useGetNftActiveTags(collections: CollectionDto[]): NftCollectionTag[] {
    const [filters] = useFilter({ name: NftFilterNames.COLLECTIONS, multiple: true });
    const tags: NftCollectionTag[] = useMemo(() => {
        const newTags: NftCollectionTag[] = [];
        const filteredCollections = filters || [];
        filteredCollections.forEach((filterCollectionId) => {
            const collection = collections.find((collection) => collection.id === Number(filterCollectionId));
            if (collection) newTags.push(getCollectionTag(collection));
        });
        return newTags;
    }, [collections, filters]);

    return tags;
}

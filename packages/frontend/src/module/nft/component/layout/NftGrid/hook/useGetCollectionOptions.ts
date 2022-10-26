import { CollectionDto } from "module/api/service";
import { useMemo } from "react";
import { NftCollectionTag } from "../NftGrid.types";

export default function useGetCollectionOptions(collections: CollectionDto[]): NftCollectionTag[] {
    const options: NftCollectionTag[] = useMemo(() => {
        return collections.map((collection) => ({
            label: collection.name || "Col. " + collection.id,
            value: collection.id,
        }));
    }, [collections]);

    return options;
}

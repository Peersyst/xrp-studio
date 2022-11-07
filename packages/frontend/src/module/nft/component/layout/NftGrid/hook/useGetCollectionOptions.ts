import { CollectionDto } from "module/api/service";
import { useMemo } from "react";
import { NftCollectionTag } from "../NftGrid.types";
import getCollectionTag from "../util/getCollectionTag";

export default function useGetCollectionOptions(collections: CollectionDto[]): NftCollectionTag[] {
    const options: NftCollectionTag[] = useMemo(() => {
        return collections.map((collection) => getCollectionTag(collection));
    }, [collections]);

    return options;
}
